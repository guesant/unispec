import type { IUniNode } from "@unispec/ast-types";
import type { UniRepository } from "../../repository";
import type { CompileClass } from "./compile-class";

export interface ICompileClassContext {
  node: IUniNode;
  meta?: Record<string, any>;
  //
  host: CompileClass;
  //
  repository: UniRepository;
  dtoClassesMap: Map<string, any>;
  //
  ctorDecorators: ClassDecorator[];
  properties: Record<string, { designType: any; decorators: PropertyDecorator[] }>;

  EnsureProperty(property: string): this;

  AddCtorDecorator(ctorDecorator: ClassDecorator): this;
  AddPropertyDecorator(property: string, propertyDecorator: PropertyDecorator): this;

  AddCtorDecorators(ctorDecorators: ClassDecorator[]): this;
  AddPropertyDecorators(property: string, propertyDecorators: PropertyDecorator[]): this;

  SetPropertyDesignType(property: string, designType: any): this;
}

export interface ICompileClassHandlerCtorContext extends ICompileClassContext {
  className: string;
}

export interface ICompileClassHandlerPropertyContext extends ICompileClassHandlerCtorContext, ICompileClassContext {
  propertyNode: IUniNode;
  propertyKey: string;
}

export interface ICompileClassHandler {
  HandleCtor(context: ICompileClassContext): void;
}
