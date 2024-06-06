import type { IUniNodeTypeBase } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeBase } from "./UniNodeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeBase = UniNodeBase.shape({
  kind: yup.string().oneOf(["type"]).required(),
  type: yup.string().required(),
  nullable: yup.boolean().required(),
  required: yup.boolean().required(),
  description: yup.string().required(),
  default: yup.mixed(),
});

export type UniNodeTypeBase = yup.InferType<typeof UniNodeTypeBase>;

export const CheckTypeBase = SimpleCheck<IUniNodeTypeBase>(UniNodeTypeBase);
export const BuildTypeBase = SimpleBuilder<IUniNodeTypeBase>(UniNodeTypeBase);

TypeAssert<TypeEqualityGuard<IUniNodeTypeBase, UniNodeTypeBase>>();
