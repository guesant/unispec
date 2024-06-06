import type { IUniNode } from "@unispec/ast-types";
import * as yup from "yup";

export const UniNode = yup.mixed<IUniNode>();
