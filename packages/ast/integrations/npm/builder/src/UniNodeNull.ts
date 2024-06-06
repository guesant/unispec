import * as yup from "yup";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";
import type { IUniNodeNull } from "@unispec/ast-types";
import { UniNodeBase } from "./UniNodeBase";

export const UniNodeNull = UniNodeBase.shape({
  kind: yup.string().oneOf(["null"]).required(),
});

export type UniNodeNull = yup.InferType<typeof UniNodeNull>;

TypeAssert<TypeEqualityGuard<IUniNodeNull, UniNodeNull>>();
