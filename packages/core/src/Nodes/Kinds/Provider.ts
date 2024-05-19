import { IUniNode } from "../Node";

// ==================================================================================

export interface IUniNodeProviderContext {
  Add(node: IUniNode): this;
}

export type IUniNodeProviderFn = (ctx: IUniNodeProviderContext) => void;

export type IUniNodeProvider = {
  kind: "provider";
  fn: IUniNodeProviderFn;
};

export const UniNodeProvider = (fn: IUniNodeProviderFn): IUniNodeProvider => {
  return {
    kind: "provider",
    fn,
  };
};

// ==================================================================================
