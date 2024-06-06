import type { IUniNodeOperation, IUniNodeType, IUniNodeTypeBoolean, IUniNodeTypeInteger, IUniNodeTypeReference, IUniNodeTypeString } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeBase } from "./UniNodeBase";
import { SimpleBuilder } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeOperation = UniNodeBase.shape({
  kind: yup.string().oneOf(["operation"]).required(),

  name: yup.string().required(),
  description: yup.string().required(),

  meta: yup
    .object({
      gql: yup
        .object({
          kind: yup.mixed<"query" | "mutation" | false>().oneOf(["query", "mutation", false]),
        })
        .optional(),
    })
    .optional(),

  input: yup
    .object({
      body: yup.mixed<string | IUniNodeType>().optional(),
      params: yup.mixed<Record<any, IUniNodeTypeReference | IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeBoolean>>().optional(),
      queries: yup.mixed<Record<any, IUniNodeTypeReference | IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeBoolean>>().optional(),
    })
    .optional(),

  output: yup
    .object({
      success: yup.mixed<string | IUniNodeType>().optional(),
    })
    .optional(),
});

export type UniNodeOperation = yup.InferType<typeof UniNodeOperation>;

export const CheckOperation = SimpleCheck<IUniNodeOperation>(UniNodeOperation);
export const BuildOperation = SimpleBuilder<IUniNodeOperation>(UniNodeOperation);

TypeAssert<TypeEqualityGuard<IUniNodeOperation, UniNodeOperation>>();
