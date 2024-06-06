import type { IUniNodeType, IUniNodeTypeBoolean, IUniNodeTypeInteger, IUniNodeTypeReference, IUniNodeTypeString } from "./Type";

export type IUniNodeOperation = {
  kind: "operation";

  name: string;
  description: string;

  input?: {
    body?: string | IUniNodeType;
    params?: Record<any, IUniNodeTypeReference | IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeBoolean>;
    queries?: Record<any, IUniNodeTypeReference | IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeBoolean>;
  };

  output?: {
    success?: string | IUniNodeType;
  };

  meta?: {
    gql?: {
      kind?: "query" | "mutation" | false;
    };
  } & Record<string, any>;
};

export const UniNodeOperation = <Target extends IUniNodeOperation, Op extends Omit<Target, "kind">, Output extends Target & Op>(operation: Op) => {
  return {
    kind: "operation",
    ...operation,
  } as Output;
};
