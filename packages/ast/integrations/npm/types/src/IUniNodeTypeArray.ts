import type { IUniNodeType } from "./IUniNodeType";
import type { IUniNodeTypeBase } from "./IUniNodeTypeBase";

export type IUniNodeTypeArray = IUniNodeTypeBase & {
  type: "array";
  items: IUniNodeType;
};
