import type { IUniNodeProvider, IUniNodeProviderFn } from "@unispec/ast-types";

/**
 * @deprecated Use IUniNodeModule instead.
 */
export const UniNodeProvider = (fn: IUniNodeProviderFn): IUniNodeProvider => {
  return {
    kind: "provider",
    fn,
  };
};
