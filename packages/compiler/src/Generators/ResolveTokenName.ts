import * as U from "@unispec/core";
import { IUniNode } from "@unispec/core";

export type IResolveTokenName = (node: IUniNode) => string;

export const CreateResolveTokenName = (): IResolveTokenName => {
  let c = 0;

  const ResolveTokenName = (node: IUniNode) => {
    if (U.IsNodeView(node)) {
      return `I${node.name}Dto`;
    }

    if (U.IsNodeType(node)) {
      if (node.type === "reference") {
        return `I${node.targetsTo}Dto`;
      }
    }

    return `Unnamed${++c}`;
  };

  return ResolveTokenName;
};
