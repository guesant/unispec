import type { IUniNodeTypeBase } from "./IUniNodeTypeBase";

export type IUniNodeTypeReference = IUniNodeTypeBase & {
  type: "reference";
  targetsTo: string;
  objectProperty: string | null;
};
