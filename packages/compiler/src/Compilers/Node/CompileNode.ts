import type { IUniNodeType } from "@unispec/core";
import type { UniRepository } from "../../Repository";
import { NodeVisitor } from "../../Visitors";
import { CompileClass } from "../Class";

export class CompileNode extends NodeVisitor {
  constructor(
    readonly repository: UniRepository,
    readonly classCompiler: CompileClass = new CompileClass(),
  ) {
    super(false);
  }

  override OnUnhandled() {
    return null;
  }

  HandleTypeReference(node: IUniNodeType) {
    const dereferenced = this.repository.GetRealTarget(node);

    if (dereferenced) {
      return this.Handle(dereferenced);
    }

    return this.OnUnhandled();
  }
}
