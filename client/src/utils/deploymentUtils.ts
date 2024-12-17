import { ParseResult } from "@solidity-parser/parser";
import { FunctionDefinition } from "@solidity-parser/parser/dist/src/ast-types";

export const getFunctionsFromAST = (tree: ParseResult): string[] => {
    if (tree.errors || tree.children.length == 0){
      return []
    }

    const contractDefinition = tree.children.find((child) => child.type === "ContractDefinition") 

    if (contractDefinition === undefined || contractDefinition.subNodes.length == 0){
      return []
    }

    const functionDefinitions: FunctionDefinition[] = contractDefinition.subNodes.filter(
      (subNode) => subNode.type === "FunctionDefinition") as FunctionDefinition[];

    if (functionDefinitions.length == 0){
      return []
    }

    const functionNames: string[] = functionDefinitions
      .filter((functionDefinition) => functionDefinition.isConstructor === false)
      .map( (func) => func.name) as string[]

    return functionNames
  }