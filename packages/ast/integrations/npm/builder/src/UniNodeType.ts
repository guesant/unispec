import type { IUniNodeType } from "@unispec/ast-types";
import * as yup from "yup";

export const UniNodeType = yup.mixed<IUniNodeType>();
