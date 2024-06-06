import type { IUniNodeTypeInteger } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeInteger = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["integer"]).required(),

  constraints: yup.object({
    min: yup.number().optional(),
    max: yup.number().optional(),
    integer: yup.boolean().optional(),
    positive: yup.boolean().optional(),
  }).optional(),
});

export type UniNodeTypeInteger = yup.InferType<typeof UniNodeTypeInteger>;

TypeAssert<TypeEqualityGuard<IUniNodeTypeInteger, UniNodeTypeInteger>>();
