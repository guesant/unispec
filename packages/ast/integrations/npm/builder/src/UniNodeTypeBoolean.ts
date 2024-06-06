import type { IUniNodeTypeBoolean } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeBoolean = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["boolean"]).required(),
});

export type UniNodeTypeBoolean = yup.InferType<typeof UniNodeTypeBoolean>;

TypeAssert<TypeEqualityGuard<IUniNodeTypeBoolean, UniNodeTypeBoolean>>();
