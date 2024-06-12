import type { ICompileClassContext, ICompileClassHandler } from "./compile-class-typings";

export abstract class CompileClassHandler implements ICompileClassHandler {
  HandleCtor(context: ICompileClassContext, parent?: string | null): void;

  HandleCtor() {}
}
