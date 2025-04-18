import solc from 'solc';
import path from 'path';
import fs from 'fs';

export function compileContract(sourceCode: string) {
  const input = {
    language: 'Solidity',
    sources: {
      'InjectedContract.sol': {
        content: sourceCode,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode'],
        },
      },
    },
  };

  function findImports(importPath: string) {
  try {
    const resolvedPath = require.resolve(importPath, { paths: [process.cwd()] });
    const source = fs.readFileSync(resolvedPath, 'utf8');
    return { contents: source };
  } catch (err) {
    return { error: `Unable to load ${importPath}` };
  }
}


  const output = JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
  );

  if (output.errors) {
    const errors = output.errors.filter((e: any) => e.severity === 'error');
    if (errors.length > 0) {
      return { success: false, errors };
    }
  }

  const contractName = Object.keys(output.contracts['InjectedContract.sol'])[0];
  const { abi, evm } = output.contracts['InjectedContract.sol'][contractName];

  return {
    success: true,
    abi,
    bytecode: evm.bytecode.object,
  };
}
