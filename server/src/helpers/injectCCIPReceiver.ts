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
      .replace(/\)\s*{/, ', address _router) CCIPReceiver(_router) {\n        initializeWhitelist();');
    modified = modified.replace(fullConstructor, updatedConstructor);
  } else {
    modified = modified.replace(
      /contract\s+\w+\s+is\s+CCIPReceiver\s*{/,
      (match) => `${match}
    constructor(address _router) CCIPReceiver(_router) {
        initializeWhitelist();
    }`
    );
  }

  // 4. Create whitelist mapping
  const functionSelectors = functionsToCopy.map(signature => {
    const normalized = normalizeSignature(signature);
    const selector = ethers.utils
      .keccak256(ethers.utils.toUtf8Bytes(normalized))
      .slice(2, 10); // remove '0x' prefix
    return `whitelist[bytes4(hex"${selector}")] = true;`;
  }).join('\n        ');
  

  const whitelistCode = `
    mapping(bytes4 => bool) public whitelist;

    function initializeWhitelist() internal {
        ${functionSelectors}
    }
  `;

  modified = modified.replace(
    /contract\s+\w+\s+is\s+CCIPReceiver\s*{/, 
    (match) => `${match}\n${whitelistCode}`
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

  modified = modified.replace(/\n\}\s*$/, `\n${ccipFunction}\n}`);

  return modified;
}

function normalizeSignature(sig: string): string {
  const match = sig.match(/^(\w+)\((.*)\)$/);
  if (!match) return sig;
  const name = match[1];
  const params = match[2]
    .split(',')
    .map(param => param.trim().split(' ')[0]) // take only the type, e.g., "string question" → "string"
    .join(',');
  return `${name}(${params})`;
}
