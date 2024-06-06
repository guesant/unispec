import type { IUniNodeModule } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNode } from "./UniNode";
import { UniNodeBase } from "./UniNodeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeModule = UniNodeBase.shape({
  kind: yup.string().oneOf(["module"]).required().default("module"),
  nodes: yup.array(yup.lazy(() => UniNode.required())).required(),
});

export type UniNodeModule = yup.InferType<typeof UniNodeModule>;

export const CheckModule = SimpleCheck<IUniNodeModule>(UniNodeModule);
export const BuildModule = SimpleBuilder<IUniNodeModule>(UniNodeModule);

TypeAssert<TypeEqualityGuard<IUniNodeModule, UniNodeModule>>();
