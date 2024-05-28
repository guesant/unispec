import { defu } from "defu";
import type { PartialDeep } from "type-fest";
import type { IUniNode } from "../Node";

export const UniExtends = <Base extends IUniNode>(node: Base, ...overrides: PartialDeep<Base>[]) => defu(node, ...overrides);
