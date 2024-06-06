import type { IUniNodeType } from "./IUniNodeType";
import type { IUniNodeTypeBase } from "./IUniNodeTypeBase";

export type IUniNodeTypeObject = IUniNodeTypeBase & {
  type: "object";

  partialOf: string | null;

  properties: Record<string, IUniNodeType>;
};
