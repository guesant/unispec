import type { IUniNode } from "@unispec/ast-types";
import type { ICompileClassContext } from "./compile-class";

export interface ICompileClassHandlerCtorContext extends ICompileClassContext {
  className: string;
}

export interface ICompileClassHandlerPropertyContext extends ICompileClassHandlerCtorContext, ICompileClassContext {
  propertyNode: IUniNode;
  propertyKey: string;
}

export interface ICompileClassHandler {
  compileCtorDecorators(context: ICompileClassHandlerCtorContext): null | any[];

  compilePropertyDecorators(context: ICompileClassHandlerPropertyContext): null | any[];
}

export abstract class CompileClassHandler implements ICompileClassHandler {
  compileCtorDecorators(context: ICompileClassHandlerCtorContext): null | any[];

  compileCtorDecorators(): null | any[] {
    return null;
  }

  compilePropertyDecorators(context: ICompileClassHandlerPropertyContext, parent?: string | null): null | any[];

  compilePropertyDecorators(): null | any[] {
    return null;
  }
}
