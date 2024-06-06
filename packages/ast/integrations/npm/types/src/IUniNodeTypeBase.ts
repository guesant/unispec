import type { IUniNodeBase } from "./IUniNodeBase";

export type IUniNodeTypeBase = IUniNodeBase & {
  kind: "type";

  type: string;

  nullable: boolean;
  required: boolean;

  /**
   * @deprecated
   */
  description: string;

  default?: any;
};
