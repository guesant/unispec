import type { IUniNodeTypeBase } from "./IUniNodeTypeBase";

export type IUniNodeTypeString = IUniNodeTypeBase & {
  type: "string";
  format?: "uuid" | "date" | "date-time" | "time" | "e-mail";
  constraints?: {
    minLength?: number | false;
    maxLength?: number | false;
    pattern?: string;
  };
};
