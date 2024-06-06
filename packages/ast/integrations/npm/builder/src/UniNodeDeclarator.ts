import type { IUniNodeDeclarator } from "@unispec/ast-types";

/**
 * @deprecated
 */
export const UniNodeDeclarator = <Target extends IUniNodeDeclarator, Options extends Partial<Target>, Output extends Target & Options>(options: Partial<Options> = {}) => {
  return {
    kind: "declarator",
    entity: "UnknownEntity",
    ...options,
  } as Output;
};
