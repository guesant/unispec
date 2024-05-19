import { IToken } from "../Token";

// ==================================================================================

export interface IProviderContext {
  Add(node: IToken): this;
}

export type IProviderFn = (ctx: IProviderContext) => void;

export type IProvider = {
  kind: "provider";
  fn: IProviderFn;
};

export const IProvider = (fn: IProviderFn): IProvider => {
  return {
    kind: "provider",
    fn,
  };
};

// ==================================================================================
