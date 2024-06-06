import type { IUniNode } from "@unispec/ast-types";
import * as yup from "yup";
import { UniNodeModule } from "./UniNodeModule";
import { UniNodeNull } from "./UniNodeNull";
import { UniNodeOperation } from "./UniNodeOperation";
import { UniNodeType } from "./UniNodeType";
import { UniNodeView } from "./UniNodeView";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";
import { yupOneOf } from "./utils/yup-helpers";

export const UniNode: yup.MixedSchema<IUniNode | undefined, yup.AnyObject, undefined, ""> = yupOneOf<IUniNode>(() => [UniNodeNull, UniNodeType, UniNodeOperation, UniNodeView, UniNodeModule]);

export const Check = SimpleCheck<IUniNode>(UniNode);
export const Build = SimpleBuilder<IUniNode>(UniNode);
