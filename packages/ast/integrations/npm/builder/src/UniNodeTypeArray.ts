import type { IUniNodeTypeArray } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeType } from "./UniNodeType";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeArray = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["array"]).required().default("array"),
  items: yup.lazy(() => UniNodeType.required()),
});

export type UniNodeTypeArray = yup.InferType<typeof UniNodeTypeArray>;

export const CheckTypeArray = SimpleCheck<IUniNodeTypeArray>(UniNodeTypeArray);
export const BuildTypeArray = SimpleBuilder<IUniNodeTypeArray>(UniNodeTypeArray);

TypeAssert<TypeEqualityGuard<IUniNodeTypeArray, UniNodeTypeArray>>();
