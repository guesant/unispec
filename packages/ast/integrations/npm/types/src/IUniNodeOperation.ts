import type { IUniNodeType } from "./IUniNodeType";
import type { IUniNodeTypeBoolean } from "./IUniNodeTypeBoolean";
import type { IUniNodeTypeInteger } from "./IUniNodeTypeInteger";
import type { IUniNodeTypeReference } from "./IUniNodeTypeReference";
import type { IUniNodeTypeString } from "./IUniNodeTypeString";

export type IUniNodeOperation = {
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

    params?: Record<any, IUniNodeTypeReference | IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeBoolean>;
    queries?: Record<any, IUniNodeTypeReference | IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeBoolean>;
  };
  output?: {
    success?: string | IUniNodeType;
  };
};
