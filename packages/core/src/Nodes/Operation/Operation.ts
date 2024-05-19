import { IType, ITypeBoolean, ITypeInteger, ITypeString } from "../Types";

export type IOperation = {
  kind: "operation";

  name: string;
  description: string;

  input?: {
    body?: string | IType;
    queries?: Record<any, ITypeString | ITypeInteger | ITypeBoolean>;
  };

  output?: {
    success?: string | IType;
  };
};

export const Operation = <K extends IOperation, Op extends Omit<K, "kind">>(operation: Op): IOperation => {
  return {
    kind: "operation",
    ...operation,
  };
};
