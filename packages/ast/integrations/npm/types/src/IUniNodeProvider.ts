import type { IUniNode } from "./IUniNode";

/**
 * @deprecated Use IUniNodeModule instead.
 */
export type IUniNodeProvider = {
  kind: "provider";
  fn: IUniNodeProviderFn;
};

export interface IUniNodeProviderContext {
  Add(node: IUniNode): this;
}

export type IUniNodeProviderFn = (ctx: IUniNodeProviderContext) => void;
