import type { IUniNodeType } from "@unispec/ast-types";
import * as yup from "yup";
import { SimpleBuilder } from "./utils/simple";

export const UniNodeType = yup.mixed<IUniNodeType>();

export const CheckType = SimpleCheck<IUniNodeType>(UniNodeType);
export const BuildType = SimpleBuilder<IUniNodeType>(UniNodeType);
