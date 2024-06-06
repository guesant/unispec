import type { IUniNodeTypeFile } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeBase } from "./UniNodeTypeBase";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { TypeAssert, type TypeEqualityGuard } from "./utils/type-assert";

export const UniNodeTypeFile = UniNodeTypeBase.shape({
  type: yup.string().oneOf(["file"]).required().default("file"),
  mimeTypes: yup.array(yup.string().required()).required(),
});

export type UniNodeTypeFile = yup.InferType<typeof UniNodeTypeFile>;

export const CheckTypeFile = SimpleCheck<IUniNodeTypeFile>(UniNodeTypeFile);
export const BuildTypeFile = SimpleBuilder<IUniNodeTypeFile>(UniNodeTypeFile);

TypeAssert<TypeEqualityGuard<IUniNodeTypeFile, UniNodeTypeFile>>();
