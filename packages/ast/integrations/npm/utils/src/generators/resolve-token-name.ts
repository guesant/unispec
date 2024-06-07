import { CheckNamedBase, CheckType, CheckTypeReference } from "@unispec/ast-builder";
import type { IUniNode } from "@unispec/ast-types";

export type IResolveTokenName = (node: IUniNode) => string;

export type ICreateResolveTokenNameOptions = {
  prefix?: string | ((node: IUniNode) => string);
  suffix?: string | ((node: IUniNode) => string);
};

const locResolve = (node: IUniNode, k?: string | ((node: IUniNode) => string)) => {
  if (k) {
    if (typeof k === "string") {
      return k;
    }

    return k(node);
  }

  return "";
};

export const CreateResolveTokenName = (options?: ICreateResolveTokenNameOptions): IResolveTokenName => {
  let c = 0;

  const ResolveTokenName = (node: IUniNode) => {
    const prefix = locResolve(node, options?.prefix);
    const suffix = locResolve(node, options?.suffix);

    if (CheckNamedBase(node)) {
      return `${prefix}${node.name}${suffix}`;
    }

    if (CheckType(node)) {
      if (CheckTypeReference(node)) {
        return `${prefix}${node.targetsTo}${suffix}`;
      }
    }

    return `${prefix}Unnamed${++c}${suffix}`;
  };

  return ResolveTokenName;
};
