import { IUniNode } from "../Node";
import { IUniNodeBase } from "./-Base";
import { IUniNodeType } from "./Type";

// ===========================================================

export type IUniNodeView = IUniNodeBase & {
  kind: "view";
  name: string;
  description: string;
  partialOf: string | null;
  properties: Record<string, IUniNodeType>;
};

export const UniNodeView = <Target extends IUniNodeView, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return {
    kind: "view",
    name: "UnnamedView",
    description: "",
    partialOf: null,
    ...options,
    properties: {
      ...options?.properties,
    },
  } as Output;
};

export const IsUniNodeView = (node: IUniNode): node is IUniNodeView => {
  return node.kind === "view";
};

// ===========================================================
