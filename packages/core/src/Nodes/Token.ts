import { IDeclarator } from "./Declarator";
import { IOperation } from "./Operation";
import { IProvider } from "./Provider";
import { IType } from "./Types";
import { IView } from "./View";

export type IToken = IType | IOperation | IDeclarator | IProvider | IView;
