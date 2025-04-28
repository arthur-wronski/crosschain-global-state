import { ethers } from "ethers";

export function injectCCIPReceiver(contract: string, functionsToCopy: string[]): string {
  let modified = contract;

  // 1. Update imports
  modified = modified.replace(
    /pragma solidity [^;]+;/,
    (match) => `${match}\n` +
      `import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";\n` +
      `import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";`
  );

  // 2. Inherit CCIPReceiver
  modified = modified.replace(
    /contract\s+(\w+)\s*{/,
    (match, p1) => `contract ${p1} is CCIPReceiver {`
  );

  // 3. Update constructor
  const constructorMatch = modified.match(/constructor\s*\(([^)]*)\)\s*{([\s\S]*?)}/);
  if (constructorMatch) {
    const fullConstructor = constructorMatch[0];
    const updatedConstructor = fullConstructor
      .replace(/constructor\s*\(/, 'constructor(')
      .replace(/\)\s*{/, ', address _router) CCIPReceiver(_router) {');
    modified = modified.replace(fullConstructor, updatedConstructor);
  } else {
    modified = modified.replace(
      /contract\s+[^\{]+\{\s*/,
      (match) => `${match}\n    constructor(address _router) CCIPReceiver(_router) {}`
    );
  }

  // 4. Create whitelist mapping
  const functionSelectors = functionsToCopy.map(signature => {
    const methodId = ethers.utils.id(signature).slice(0, 10);
    return `whitelist[bytes4(${methodId})] = true;`;
  }).join('\n        ');

  const whitelistCode = `
    mapping(bytes4 => bool) public whitelist;

    function initializeWhitelist() internal {
        ${functionSelectors}
    }
  `;

  modified = modified.replace(
    /{\s*(constructor\(.*?\))/,
    `{${whitelistCode}$1`
  );

  // 5. func to receive messages and call the ABI encoded function call, now checks if function selector is whitelisted for safety
  const ccipFunction = `
    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
      bytes memory _data = message.data;
      bytes4 selector;
      assembly {
          selector := mload(add(_data, 32))
      }
      require(whitelist[selector], "Function not whitelisted");

      (bool success, ) = address(this).call(_data);
      require(success, "CCIP message execution failed");
  }
  `;

  modified = modified.replace(/\n\}\s*$/, `${ccipFunction}}`);

  return modified;
}
