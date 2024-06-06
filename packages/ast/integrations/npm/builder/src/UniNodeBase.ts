import type { IUniNodeBase } from "@unispec/ast-types";
import * as yup from "yup";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeBase = yup.object({
  kind: yup.string().required(),
});

export type UniNodeBase = yup.InferType<typeof UniNodeBase>;

TypeAssert<TypeEqualityGuard<IUniNodeBase, UniNodeBase>>();
