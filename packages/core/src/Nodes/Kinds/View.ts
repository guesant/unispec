import type { IUniNode } from "../Node";
import type { IUniNodeBase } from "./-Base";
import type { IUniNodeType } from "./Type";

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

export const IsUniNodeView = (node: IUniNode | any): node is IUniNodeView => node.kind === "view";

// ===========================================================
