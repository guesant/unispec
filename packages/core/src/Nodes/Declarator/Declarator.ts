import { IOperation } from "../Operation/Operation";

export type IDeclarator = {
  kind: "declarator";

  entity: string;

  operations?: {
    crud?: {
      findById?: false | { input: string; output: string };
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
      [key: string]: IOperation;
    };
  };
};

export const Declarator = <Target extends IDeclarator, Options extends Partial<Target>, Output extends Target & Options>(options: Partial<Options> = {}) => {
  return {
    kind: "declarator",
    entity: "UnknownEntity",
    ...options,
  } as Output;
};
