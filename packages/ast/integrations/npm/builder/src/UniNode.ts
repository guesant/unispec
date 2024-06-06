import type { IUniNode } from "@unispec/ast-types";
import * as yup from "yup";
import { SimpleBuilder, SimpleCheck } from "./utils/simple";

export const UniNode = yup.mixed<IUniNode>();

export const Check = SimpleCheck<IUniNode>(UniNode);
export const Build = SimpleBuilder<IUniNode>(UniNode);
