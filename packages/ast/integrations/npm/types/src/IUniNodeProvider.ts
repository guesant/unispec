import type { IUniNode } from "./IUniNode";

/**
 * @deprecated Use IUniNodeModule instead.
 */
export type IUniNodeProvider = {
  kind: "provider";
  fn: IUniNodeProviderFn;
};

interface IUniNodeProviderContext {
  Add(node: IUniNode): this;
}

type IUniNodeProviderFn = (ctx: IUniNodeProviderContext) => void;
