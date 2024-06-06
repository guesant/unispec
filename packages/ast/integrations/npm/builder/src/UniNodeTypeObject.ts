import type { IUniNodeType, IUniNodeTypeObject } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeObject = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["object"]).required(),
  partialOf: yup.string().nullable().default(() => null),
  properties: yup.mixed<Record<string, IUniNodeType>>().required(),
});

export type UniNodeTypeObject = yup.InferType<typeof UniNodeTypeObject>;

TypeAssert<TypeEqualityGuard<IUniNodeTypeObject, UniNodeTypeObject>>();
