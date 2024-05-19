export type IBase = {
  kind: string;
};

export const Base = <Target extends IBase, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return {
    kind: "base",
    ...options,
  } as Output;
};
