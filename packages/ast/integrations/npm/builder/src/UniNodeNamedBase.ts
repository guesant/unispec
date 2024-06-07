import type { IUniNodeNamedBase } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeBase } from "./UniNodeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeNamedBase = UniNodeBase.shape({
  name: yup.string().required(),
});

export const CheckNamedBase = SimpleCheck<IUniNodeNamedBase>(UniNodeNamedBase);
export const BuildNamedBase = SimpleBuilder<IUniNodeNamedBase>(UniNodeNamedBase);

export type UniNodeNamedBase = yup.InferType<typeof UniNodeNamedBase>;

TypeAssert<TypeEqualityGuard<IUniNodeNamedBase, UniNodeNamedBase>>();
