import type { IUniNode } from "@unispec/ast-types";
import type { PartialDeep } from "type-fest";
import { DeepAssign } from "./utils/deep-assign";

export const UniExtends = <Base extends IUniNode>(node: Base, ...overrides: PartialDeep<Base>[]) => DeepAssign(node, ...overrides);
