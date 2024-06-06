import type { IUniNodeTypeString } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeString = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["string"]).required(),

  format: yup.string().oneOf(["uuid", "date", "date-time", "time", "e-mail"]).optional(),

  constraints: yup
    .object({
      minLength: yup.mixed<number | false>().optional(),
      maxLength: yup.mixed<number | false>().optional(),
      pattern: yup.string().optional(),
    })
    .optional(),
});

export type UniNodeTypeString = yup.InferType<typeof UniNodeTypeString>;

export const CheckTypeString = SimpleCheck<IUniNodeTypeString>(UniNodeTypeString);
export const BuildTypeString = SimpleBuilder<IUniNodeTypeString>(UniNodeTypeString);

TypeAssert<TypeEqualityGuard<IUniNodeTypeString, UniNodeTypeString>>();
