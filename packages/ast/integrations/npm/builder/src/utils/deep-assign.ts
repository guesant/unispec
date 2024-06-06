import defu from "defu";

export const DeepAssign = <C extends Record<string, any>, K extends Record<string, any>>(current: C, ...overrides: K[]) => {
  return defu({} as C, ...Array.from(overrides).reverse(), current);
};
