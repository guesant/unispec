import type { IUniNodeView } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNode } from "./UniNode";
import { UniNodeNamedBase } from "./UniNodeNamedBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeView = UniNodeNamedBase.shape({
  kind: yup.string().oneOf(["view"]).required().default("view"),

  name: yup.string().required(),
  title: yup.string().optional(),
  description: yup.string().optional(),

  type: yup.lazy(() => UniNode.required()),
});

export type UniNodeView = yup.InferType<typeof UniNodeView>;

export const CheckView = SimpleCheck<IUniNodeView>(UniNodeView);
export const BuildView = SimpleBuilder<IUniNodeView>(UniNodeView);

TypeAssert<TypeEqualityGuard<IUniNodeView, UniNodeView>>();
