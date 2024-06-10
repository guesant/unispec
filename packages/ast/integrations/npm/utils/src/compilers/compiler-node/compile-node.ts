import type { IUniNode, IUniNodeType } from "@unispec/ast-types";
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

  protected OnUnhandled(node: IUniNode, context?: T): any;

  protected override OnUnhandled() {
    return null;
  }

  protected HandleTypeReference(node: IUniNodeType, context?: T | undefined) {
    const dereferenced = this.repository.GetRealTarget(node);

    if (dereferenced) {
      return this.Handle(dereferenced, context);
    }

    return this.OnUnhandled(node, context);
  }
}
