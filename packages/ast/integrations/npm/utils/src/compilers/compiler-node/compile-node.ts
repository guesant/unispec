import type { IUniNodeType } from "@unispec/ast-types";
import type { UniRepository } from "../../repository";
import { NodeVisitor } from "../../visitor";
import { CompileClass } from "../compiler-class";

export class CompileNode<T = any> extends NodeVisitor<T> {
  constructor(
    readonly repository: UniRepository,
    readonly classCompiler: CompileClass = new CompileClass(),
  ) {
    super(false);
  }

  override OnUnhandled() {
    return null;
  }

  HandleTypeReference(node: IUniNodeType, context?: T | undefined) {
    const dereferenced = this.repository.GetRealTarget(node);

    if (dereferenced) {
      return this.Handle(dereferenced, context);
    }

    return this.OnUnhandled();
  }
}
