import type { IUniNodeTypeFile } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeFile = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["file"]).required(),
  mimeTypes: yup.array(yup.string().required()).required(),
});

export type UniNodeTypeFile = yup.InferType<typeof UniNodeTypeFile>;

TypeAssert<TypeEqualityGuard<IUniNodeTypeFile, UniNodeTypeFile>>();
