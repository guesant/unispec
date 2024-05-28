import type { IUniNodeDeclarator, IUniNodeOperation, IUniNodeProvider, IUniNodeType, IUniNodeView } from "./Kinds";

export type IUniNode = IUniNodeType | IUniNodeOperation | IUniNodeDeclarator | IUniNodeProvider | IUniNodeView;
