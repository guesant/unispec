import type { IUniNodeNull } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeBase } from "./UniNodeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeNull = UniNodeBase.shape({
  kind: yup.string().oneOf(["null"]).required(),
});

export type UniNodeNull = yup.InferType<typeof UniNodeNull>;

export const CheckNull = SimpleCheck<IUniNodeNull>(UniNodeNull);
export const BuildNull = SimpleBuilder<IUniNodeNull>(UniNodeNull);

TypeAssert<TypeEqualityGuard<IUniNodeNull, UniNodeNull>>();
