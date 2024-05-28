import type { IUniNodeTypeObject, IUniNodeTypeString, IUniNodeView } from "@unispec/core";
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

  HandleTypeObject(node: IUniNodeTypeObject) {
    if (node.partialOf) {
      const dereferenced = this.repository.GetRealTarget(node.partialOf);

      if (dereferenced) {
        return this.Handle(dereferenced);
      }
    }

    const ctor = this.classCompiler.CompileCtor(node);
    return ctor;
  }

  HandleView(node: IUniNodeView) {
    return this.Handle(node.type);
  }
}
