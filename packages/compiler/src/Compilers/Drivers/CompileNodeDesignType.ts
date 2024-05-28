import type { IUniNodeTypeString, IUniNodeView } from "@unispec/core";
import { CompileNode } from "../Node/CompileNode";

export class CompileNodeDesignType extends CompileNode {
  HandleTypeString(node: IUniNodeTypeString) {
    switch (node.format) {
      case "date-time": {
        return Date;
      }

      case "uuid":
      case "e-mail":
      case "time":
      case "date":
      default: {
        return String;
      }
    }
  }

  HandleTypeInteger(): unknown {
    return Number;
  }

  HandleTypeBoolean(): unknown {
    return Boolean;
  }

  HandleView(node: IUniNodeView) {
    if (node.partialOf) {
      const dereferenced = this.repository.GetRealTarget(node);

      if (dereferenced) {
        return this.Handle(dereferenced);
      }
    }

    const ctor = this.classCompiler.CompileCtor(node);
    return ctor;
  }
}
