import type { IUniNodeTypeReference } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeReference = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["reference"]).required(),
  targetsTo: yup.string().required(),
  objectProperty: yup
    .string()
    .nullable()
    .default(() => null),
});

export type UniNodeTypeReference = yup.InferType<typeof UniNodeTypeReference>;

TypeAssert<TypeEqualityGuard<IUniNodeTypeReference, UniNodeTypeReference>>();
