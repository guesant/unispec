// ===========================================================

import { IsUniNodeType, type IUniNodeTypeObject } from "./Type";
import { type IUniNodeView, IsUniNodeView } from "./View";

export type IUniNodeBase = {
  kind: string;
};

export const UniNodeBase = <Target extends IUniNodeBase, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return {
    kind: "base",
    ...options,
  } as Output;
};

// ===========================================================

export type IUniNodeTypeBase = {
  kind: "type";
  type: string;
  nullable: boolean;
  required: boolean;
  description: string;
  default?: any;
};

export const UniNodeTypeBase = <Target extends IUniNodeTypeBase, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return UniNodeBase({
    kind: "type",
    type: "unknown",
    nullable: false,
    required: true,
    description: "",
    default: undefined,
    ...options,
  }) as Output;
};

// ===========================================================

export type IUniNodeObjectLike = IUniNodeBase & Pick<IUniNodeTypeObject, "properties">;

export const IsUniNodeObjectLike = (obj: IUniNodeTypeObject | IUniNodeView | IUniNodeBase): obj is IUniNodeObjectLike => {
  if (IsUniNodeView(obj)) {
    return true;
  }

  if (IsUniNodeType(obj)) {
    return obj.type === "object";
  }

  if (Object.hasOwn(obj, "properties")) {
    return true;
  }

  return false;
};
