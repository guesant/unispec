import type { IUniNodeType, IUniNodeTypeBoolean, IUniNodeTypeInteger, IUniNodeTypeString } from "./Type";

export type IUniNodeOperation = {
  kind: "operation";

  name: string;
  description: string;

  input?: {
    body?: string | IUniNodeType;
    params?: Record<any, IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeBoolean>;
    queries?: Record<any, IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeBoolean>;
  };

  output?: {
    success?: string | IUniNodeType;
  };
};

export const UniNodeOperation = <Target extends IUniNodeOperation, Op extends Omit<Target, "kind">, Output extends Target & Op>(operation: Op) => {
  return {
    kind: "operation",
    ...operation,
  } as Output;
};
