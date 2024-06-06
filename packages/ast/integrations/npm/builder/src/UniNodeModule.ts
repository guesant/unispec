import type { IUniNodeModule } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeBase } from "./UniNodeBase";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";
import { UniNode } from "./UniNode";

export const UniNodeModule = UniNodeBase.shape({
  kind: yup.string().oneOf(["module"]).required(),
  nodes: yup.array(UniNode.required()).required(),
});

export type UniNodeModule = yup.InferType<typeof UniNodeModule>;

TypeAssert<TypeEqualityGuard<IUniNodeModule, UniNodeModule>>();
