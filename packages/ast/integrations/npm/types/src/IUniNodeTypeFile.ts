import type { IUniNodeTypeBase } from "./IUniNodeTypeBase";

export type IUniNodeTypeFile = IUniNodeTypeBase & {
  type: "file";
  mimeTypes: string[];
};
