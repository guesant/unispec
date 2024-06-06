import type { IUniNode } from "./IUniNode";
import type { IUniNodeBase } from "./IUniNodeBase";

export type IUniNodeModule = IUniNodeBase & {
  kind: "module";
  nodes: IUniNode[];
};
