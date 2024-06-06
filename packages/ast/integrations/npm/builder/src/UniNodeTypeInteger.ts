import type { IUniNodeTypeInteger } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeInteger = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["integer"]).required().default("integer"),

  constraints: yup
    .object({
      min: yup.number().optional(),
      max: yup.number().optional(),
      integer: yup.boolean().optional(),
      positive: yup.boolean().optional(),
    })
    .optional(),
});

export type UniNodeTypeInteger = yup.InferType<typeof UniNodeTypeInteger>;

export const CheckTypeInteger = SimpleCheck<IUniNodeTypeInteger>(UniNodeTypeInteger);
export const BuildTypeInteger = SimpleBuilder<IUniNodeTypeInteger>(UniNodeTypeInteger);

TypeAssert<TypeEqualityGuard<IUniNodeTypeInteger, UniNodeTypeInteger>>();
