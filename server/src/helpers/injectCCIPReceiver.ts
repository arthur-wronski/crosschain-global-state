export function injectCCIPReceiver(contract: string): string {
  let modified = contract;

  // 1. Update imports to match Chainlink's folder structure
  modified = modified.replace(
    /pragma solidity [^;]+;/,
    (match) =>
      `${match}\n` +
      `import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";\n` +
      `import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";`
  );

  // 2. Inherit CCIPReceiver
  modified = modified.replace(
    /contract\s+(\w+)\s*{/,
    (match, p1) => `contract ${p1} is CCIPReceiver {`
  );

  // 3. Update constructor to accept router and call CCIPReceiver(_router)
  const constructorMatch = modified.match(/constructor\s*\(([^)]*)\)\s*{([\s\S]*?)}/);

  if (constructorMatch) {
    const fullConstructor = constructorMatch[0];
    const updatedConstructor = fullConstructor
      .replace(/constructor\s*\(/, 'constructor(')
      .replace(/\)\s*{/, ', address _router) CCIPReceiver(_router) {');
    modified = modified.replace(fullConstructor, updatedConstructor);
  } else {
    modified = modified.replace(
      /contract\s+[^{]+\{\s*/,
      (match) =>
        `${match}\n` +
        `    constructor(address _router) CCIPReceiver(_router) {}\n`
    );
  }

  // 4. Inject _ccipReceive function
  const ccipFunction =
    `\n` +
    `    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {\n` +
    `        (bool success, ) = address(this).call(message.data);\n` +
    `        require(success, "CCIP message execution failed");\n` +
    `    }\n`;

  modified = modified.replace(/\n\}\s*$/, `${ccipFunction}}`);

  return modified;
}
