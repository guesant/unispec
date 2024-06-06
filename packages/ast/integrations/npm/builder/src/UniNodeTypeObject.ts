import type { IUniNodeType, IUniNodeTypeObject } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeObject = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["object"]).required().default("object"),
  partialOf: yup
    .string()
    .nullable()
    .default(() => null),
  properties: yup.mixed<Record<string, IUniNodeType>>().required(),
});

export type UniNodeTypeObject = yup.InferType<typeof UniNodeTypeObject>;

export const CheckTypeObject = SimpleCheck<IUniNodeTypeObject>(UniNodeTypeObject);
export const BuildTypeObject = SimpleBuilder<IUniNodeTypeObject>(UniNodeTypeObject);

TypeAssert<TypeEqualityGuard<IUniNodeTypeObject, UniNodeTypeObject>>();
