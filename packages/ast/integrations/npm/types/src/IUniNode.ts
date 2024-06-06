import type { IUniNodeDeclarator } from "./IUniNodeDeclarator";
import type { IUniNodeModule } from "./IUniNodeModule";
import type { IUniNodeNull } from "./IUniNodeNull";
import type { IUniNodeOperation } from "./IUniNodeOperation";
import type { IUniNodeProvider } from "./IUniNodeProvider";
import type { IUniNodeType } from "./IUniNodeType";
import type { IUniNodeView } from "./IUniNodeView";

export type IUniNode = IUniNodeNull | IUniNodeType | IUniNodeOperation | IUniNodeDeclarator | IUniNodeProvider | IUniNodeView | IUniNodeModule;
