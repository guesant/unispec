import type { IUniNode } from "./IUniNode";
import type { IUniNodeBase } from "./IUniNodeBase";

export type IUniNodeView = IUniNodeBase & {
  kind: "view";
  name: string;
  title?: string;
  description?: string;
  type: IUniNode;
};
