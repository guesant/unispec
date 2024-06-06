import type { IUniNodeTypeBase } from "./IUniNodeTypeBase";

export type IUniNodeTypeInteger = IUniNodeTypeBase & {
  type: "integer";
  constraints?: {
    min?: number;
    max?: number;
    integer?: boolean;
    positive?: boolean;
  };
};
