import { UniDeclarator, UniOperation, UniProvider } from "../legacy/types";
import { IType } from "./Types";
import { IView } from "./View/NodeView";

export type IToken = IType | UniOperation | UniDeclarator | UniProvider | IView;
