import type { IUniNodeView } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNode } from "./UniNode";
import { UniNodeBase } from "./UniNodeBase";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeView = UniNodeBase.shape({
  kind: yup.string().oneOf(["view"]).required(),

  name: yup.string().required(),
  title: yup.string().optional(),
  description: yup.string().optional(),

  type: UniNode.required(),
});

export type UniNodeView = yup.InferType<typeof UniNodeView>;

TypeAssert<TypeEqualityGuard<IUniNodeView, UniNodeView>>();
