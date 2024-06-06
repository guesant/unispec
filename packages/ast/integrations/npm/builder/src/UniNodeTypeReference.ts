import type { IUniNodeTypeReference } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeReference = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["reference"]).required().default("reference"),
  targetsTo: yup.string().required(),
  objectProperty: yup
    .string()
    .nullable()
    .default(() => null),
});

export type UniNodeTypeReference = yup.InferType<typeof UniNodeTypeReference>;

export const CheckTypeReference = SimpleCheck<IUniNodeTypeReference>(UniNodeTypeReference);
export const BuildTypeReference = SimpleBuilder<IUniNodeTypeReference>(UniNodeTypeReference);

TypeAssert<TypeEqualityGuard<IUniNodeTypeReference, UniNodeTypeReference>>();
