import type { PartialDeep } from "type-fest";
import { DeepAssign } from "../../Fixtures";
import type { IUniNode } from "../Node";

export const UniExtends = <Base extends IUniNode>(node: Base, ...overrides: PartialDeep<Base>[]) => DeepAssign(node, ...overrides);
