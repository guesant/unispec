import type { IUniNodeBase } from "@unispec/ast-types";
import * as yup from "yup";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeBase = yup.object({
  kind: yup.string().required(),
});

export const CheckBase = SimpleCheck<IUniNodeBase>(UniNodeBase);
export const BuildBase = SimpleBuilder<IUniNodeBase>(UniNodeBase);

export type UniNodeBase = yup.InferType<typeof UniNodeBase>;

TypeAssert<TypeEqualityGuard<IUniNodeBase, UniNodeBase>>();
