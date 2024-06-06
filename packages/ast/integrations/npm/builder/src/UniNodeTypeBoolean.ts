import type { IUniNodeTypeBoolean } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeBoolean = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["boolean"]).required().default("boolean"),
});

export type UniNodeTypeBoolean = yup.InferType<typeof UniNodeTypeBoolean>;

export const CheckTypeBoolean = SimpleCheck<IUniNodeTypeBoolean>(UniNodeTypeBoolean);
export const BuildTypeBoolean = SimpleBuilder<IUniNodeTypeBoolean>(UniNodeTypeBoolean);

TypeAssert<TypeEqualityGuard<IUniNodeTypeBoolean, UniNodeTypeBoolean>>();
