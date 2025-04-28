import { ParseResult } from "@solidity-parser/parser";
import { FunctionDefinition, TypeName } from "@solidity-parser/parser/dist/src/ast-types";
import { PickerOption } from "@/types/types";

const extractType = (typeName: TypeName): string => {
  if (typeName.type === "ElementaryTypeName") {
    return typeName.name;
  } else if (typeName.type === "ArrayTypeName") {
    return extractType(typeName.baseTypeName) + "[]";
  } else if (typeName.type === "UserDefinedTypeName") {
    return typeName.namePath;
  } else if (typeName.type === "Mapping") {
    return `mapping(${extractType(typeName.keyType)} => ${extractType(typeName.valueType)})`;
  } else if (typeName.type === "FunctionTypeName") {
    return "function";
  } else {
    return "unknown";
  }
};

export const getFunctionsFromAST = (tree: ParseResult): PickerOption[] => {
  if (tree.errors || tree.children.length === 0) {
    return [];
  }

  const contractDefinition = tree.children.find(
    (child) => child.type === "ContractDefinition"
  );

  if (!contractDefinition || contractDefinition.subNodes.length === 0) {
    return [];
  }

  const functionDefinitions: FunctionDefinition[] = contractDefinition.subNodes.filter(
    (subNode) => subNode.type === "FunctionDefinition"
  ) as FunctionDefinition[];

  const functionOptions: PickerOption[] = functionDefinitions
    .filter((fn) => !fn.isConstructor && fn.name !== null)
    .map((fn) => {
      const name = fn.name!;
      const paramList = fn.parameters
        .map((param) => {
          const type = param.typeName ? extractType(param.typeName) : "unknown";
          const paramName = param.name ? param.name : "param"; // fallback if missing
          return `${type} ${paramName}`;
        })
        .join(", ");
      const fullSignature = `${name}(${paramList})`;

      return { label: fullSignature, value: fullSignature };
    });

  return functionOptions;
};
