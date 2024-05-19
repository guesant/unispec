// ===========================================================

import { IToken } from "../Token";
import { IType } from "../Types";

export type IView = {
  kind: "view";
  name: string;
  description: string;
  partialOf: string | null;
  properties: Record<string, IType>;
};

export const View = <K extends Partial<IView> = Partial<IView>>(k?: K): IView => ({
  kind: "view",
  name: "UnnamedView",
  description: "",
  partialOf: null,
  ...k,
  properties: {
    ...k?.properties,
  },
});

export const IsNodeView = (node: IToken): node is IView => {
  return node.kind === "view";
};

// ===========================================================
