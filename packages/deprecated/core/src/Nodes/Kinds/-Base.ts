// ===========================================================

export type IUniNodeBase = { kind: string };

export const UniNodeBase = <Target extends IUniNodeBase, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return {
    kind: "base",
    ...options,
  } as Output;
};

// ===========================================================

export type IUniNodeNull = { kind: "null" };

export const UniNodeNull = <Target extends IUniNodeNull, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return {
    kind: "null",
    ...options,
  } as Output;
};

// ===========================================================

export type IUniNodeTypeBase = {
  kind: "type";
  type: string;
  nullable: boolean;
  required: boolean;
  description: string;
  default?: any;
};

export const UniNodeTypeBase = <Target extends IUniNodeTypeBase, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return UniNodeBase({
    kind: "type",
    type: "unknown",
    nullable: false,
    required: true,
    description: "",
    default: undefined,
    ...options,
  }) as Output;
};

// ===========================================================
