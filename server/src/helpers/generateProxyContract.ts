export function generateProxyContractCode(functionSignature: string): string {
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
  address public owner;

  error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees);
  error NotOwner();

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
    owner = msg.sender;
  }

  modifier onlyOwner() {
    if (msg.sender != owner) revert NotOwner();
    _;
  }

  function forward(bytes memory encodedArgs) external {
    bytes memory payload = abi.encodeWithSignature("${functionSignature}", encodedArgs);

    Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
      receiver: abi.encode(targetAddress),
      data: payload,
      tokenAmounts: new Client.EVMTokenAmount[](0) ,
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
}
`;
}
