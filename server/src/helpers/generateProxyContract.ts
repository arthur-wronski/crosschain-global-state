export function generateProxyContract(functionSignatures: string[]): string {
  const generateFunction = (signature: string) => {
    const functionName = signature.split('(')[0].trim();
    const argsSection = signature.match(/\((.*)\)/)?.[1].trim();

    let functionParams = '()';
    let abiArgs = '';

    if (argsSection && argsSection.length > 0) {
      const argsList = argsSection.split(',').map(arg => arg.trim());

      // inject memory keyword if needed
      const functionArgs = argsList.map(arg => {
        const [type, name] = arg.split(/\s+/); // Split type and param name
        const baseType = type.replace(/\[.*\]/, ''); // Remove array brackets if any

        // These types must specify memory
        const isDynamicType = ['string', 'bytes'].includes(baseType) || type.includes('[');
        if (isDynamicType) {
          return `${type} memory ${name}`;
        } else {
          return `${type} ${name}`;
        }
      });

      functionParams = '(' + functionArgs.join(', ') + ')';

      const abiArgNames = argsList.map(arg => {
        const parts = arg.trim().split(' ');
        return parts[parts.length - 1]; // grab parameter name
      });
      abiArgs = abiArgNames.join(', ');
    }

    // abiSignature = functionName(type1,type2,...)
    const abiSignature = functionName + '(' +
      (argsSection ? argsSection.split(',').map(arg => arg.trim().split(' ')[0]).join(',') : '') +
      ')';

    const payload = abiArgs
      ? `abi.encodeWithSignature("${abiSignature}", ${abiArgs})`
      : `abi.encodeWithSignature("${abiSignature}")`;

    return `
    function ${functionName}${functionParams} external {
        bytes memory payload = ${payload};
        _sendMessage(payload);
    }
    `;
  };

  const allFunctions = functionSignatures.map(generateFunction).join('\n');

  return `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract CCIPProxy {
    IRouterClient public router;
    LinkTokenInterface public linkToken;
    address public immutable targetAddress;
    uint64 public immutable destinationChainSelector;

    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees);

    event Forwarded(bytes32 messageId);

    constructor(
        address _router,
        address _linkToken,
        address _targetAddress,
        uint64 _destinationChainSelector
    ) {
        router = IRouterClient(_router);
        linkToken = LinkTokenInterface(_linkToken);
        targetAddress = _targetAddress;
        destinationChainSelector = _destinationChainSelector;
    }

    function _sendMessage(bytes memory payload) private {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(targetAddress),
            data: payload,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV2({
                    gasLimit: 200_000,
                    allowOutOfOrderExecution: true
                })
            ),
            feeToken: address(linkToken)
        });

        uint256 fee = router.getFee(destinationChainSelector, message);

        if (fee > linkToken.balanceOf(address(this))) {
            revert NotEnoughBalance(linkToken.balanceOf(address(this)), fee);
        }

        linkToken.approve(address(router), fee);

        bytes32 messageId = router.ccipSend(destinationChainSelector, message);

        emit Forwarded(messageId);
    }

    ${allFunctions}
}
  `;
}
