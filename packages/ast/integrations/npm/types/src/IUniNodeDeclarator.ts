import type { IUniNodeOperation } from "./IUniNodeOperation";

/**
 * @deprecated
 */
export type IUniNodeDeclarator = {
  kind: "declarator";
  entity: string;
  operations?: {
    crud?: {
      findById?:
        | false
        | {
            name: string;
            input: string;
            output: string;
          };
      deleteById?:
        | false
        | {
            name: string;
          };
      list?:
        | false
        | {
            name: string;
            view: string;
            filters?: [string, string[]][];
          };
      create?:
        | false
        | {
            name: string;
            input: string;
          };
      updateById?:
        | false
        | {
            name: string;
            input: string;
          };
    };
    extra?: {
      [key: string]: IUniNodeOperation;
    };
  };
};
