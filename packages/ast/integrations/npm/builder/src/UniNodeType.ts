import type { IUniNodeType } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeTypeArray } from "./UniNodeTypeArray";
import { UniNodeTypeBoolean } from "./UniNodeTypeBoolean";
import { UniNodeTypeFile } from "./UniNodeTypeFile";
import { UniNodeTypeInteger } from "./UniNodeTypeInteger";
import { UniNodeTypeObject } from "./UniNodeTypeObject";
import { UniNodeTypeReference } from "./UniNodeTypeReference";
import { UniNodeTypeString } from "./UniNodeTypeString";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { yupOneOf } from "./utils/yup-helpers";

export const UniNodeType: yup.MixedSchema<IUniNodeType | undefined, yup.AnyObject, undefined, ""> = yupOneOf<IUniNodeType>(() => [
  UniNodeTypeString,
  UniNodeTypeInteger,
  UniNodeTypeReference,
  UniNodeTypeObject,
  UniNodeTypeArray,
  UniNodeTypeBoolean,
  UniNodeTypeFile,
]) as any;

export const CheckType = SimpleCheck<IUniNodeType>(UniNodeType);
export const BuildType = SimpleBuilder<IUniNodeType>(UniNodeType);
