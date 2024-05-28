import type { IUniNodeDeclarator, IUniNodeNull, IUniNodeOperation, IUniNodeProvider, IUniNodeType, IUniNodeView } from "./Kinds";

export type IUniNode = IUniNodeNull | IUniNodeType | IUniNodeOperation | IUniNodeDeclarator | IUniNodeProvider | IUniNodeView;
