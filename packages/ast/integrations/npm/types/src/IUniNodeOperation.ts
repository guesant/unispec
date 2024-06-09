import type { IUniNodeNamedBase } from "./IUniNodeNamedBase";
import type { IUniNodeType } from "./IUniNodeType";

export type IUniNodeOperation = IUniNodeNamedBase & {
  kind: "operation";

  name: string;
  description: string;

  meta?: {
    gql?: {
      kind?: "query" | "mutation" | false;
    };
  } & Record<string, any>;

  input?: {
    body?: string | IUniNodeType;
    params?: Record<any, IUniNodeType>;
    queries?: Record<any, IUniNodeType>;
  };

  output?: {
    success?: string | IUniNodeType;
  };
};
