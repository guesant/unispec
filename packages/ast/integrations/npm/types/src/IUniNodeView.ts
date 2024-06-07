import type { IUniNode } from "./IUniNode";
import type { IUniNodeNamedBase } from "./IUniNodeNamedBase";

export type IUniNodeView = IUniNodeNamedBase & {
  kind: "view";
  name: string;
  title?: string;
  description?: string;
  type: IUniNode;
};
