import { IUniNodeOperation } from "./Operation";

export type IUniNodeDeclarator = {
  kind: "declarator";

  entity: string;

  operations?: {
    crud?: {
      findById?: false | {
        input: string; output: string
      };

      deleteById?: false | string;

      list?:
        | false
        | {
        view: string;
        filters?: [string, string[]][];
      };

      create?: false | string;
      updateById?: false | string;
    };

    extra?: {
      [key: string]: IUniNodeOperation;
    };
  };
};

export const UniNodeDeclarator = <Target extends IUniNodeDeclarator, Options extends Partial<Target>, Output extends Target & Options>(options: Partial<Options> = {}) => {
  return {
    kind: "declarator",
    entity: "UnknownEntity",
    ...options,
  } as Output;
};
