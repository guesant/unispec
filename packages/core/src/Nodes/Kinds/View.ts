import type { IUniNode } from "../Node";
import { UniNodeNull, type IUniNodeBase } from "./-Base";

// ===========================================================

export type IUniNodeView = IUniNodeBase & {
  kind: "view";
  //
  name: string;
  description: string;
  //
  type: IUniNode;
  opaqueType?: IUniNode | null;
};

export const UniNodeView = <Target extends IUniNodeView, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return {
    kind: "view",
    name: "UnnamedView",
    description: "Unnamed View",
    type: UniNodeNull(),
    opaqueType: null,
    ...options,
  } as Output;
};

export const IsUniNodeView = (node: IUniNode | any): node is IUniNodeView => node.kind === "view";

// ===========================================================
