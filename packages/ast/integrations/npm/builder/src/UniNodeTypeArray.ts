import type { IUniNodeTypeArray } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeType } from "./UniNodeType";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeArray = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["array"]).required(),
  items: UniNodeType.required(),
});

export type UniNodeTypeArray = yup.InferType<typeof UniNodeTypeArray>;

TypeAssert<TypeEqualityGuard<IUniNodeTypeArray, UniNodeTypeArray>>();
