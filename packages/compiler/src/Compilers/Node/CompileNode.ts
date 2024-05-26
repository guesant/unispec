import {
  IUniNode,
  IUniNodeProvider,
  IUniNodeType,
  IUniNodeTypeArray,
  IUniNodeTypeBoolean,
  IUniNodeTypeFile,
  IUniNodeTypeInteger,
  IUniNodeTypeObject,
  IUniNodeTypeString,
  IUniNodeView,
} from "@unispec/core";
import { UniRepository } from "../../Repository";
import { CompileClass } from "../Class";

export class CompileNode {
  constructor(
    readonly repository: UniRepository,
    readonly classCompiler: CompileClass = new CompileClass(),
  ) {}

  HandleTypeString(node: IUniNodeTypeString): unknown {
    return null;
  }

  HandleTypeInteger(node: IUniNodeTypeInteger): unknown {
    return null;
  }

  HandleTypeBoolean(node: IUniNodeTypeBoolean): unknown {
    return null;
  }

  HandleTypeArray(node: IUniNodeTypeArray): unknown {
    return null;
  }

  HandleTypeFile(node: IUniNodeTypeFile): unknown {
    return null;
  }

  HandleTypeObject(node: IUniNodeTypeObject): unknown {
    return null;
  }

  HandleType(node: IUniNodeType): unknown {
    switch (node.type) {
      case "string": {
        return this.HandleTypeString(node);
      }

      case "integer": {
        return this.HandleTypeInteger(node);
      }

      case "boolean": {
        return this.HandleTypeBoolean(node);
      }

      case "array": {
        return this.HandleTypeArray(node);
      }

      case "reference": {
        return this.HandleTypeReference(node);
      }

      case "file": {
        return this.HandleTypeFile(node);
      }

      case "object": {
        return this.HandleTypeObject(node);
      }

      default: {
        return null;
      }
    }
  }

  HandleView(node: IUniNodeView): unknown {
    return null;
  }

  HandleTypeReference(node: IUniNodeType) {
    const dereferenced = this.repository.GetRealTarget(node);

    if (dereferenced) {
      return this.Handle(dereferenced);
    }

    return null;
  }

  HandleProvider(node: IUniNodeProvider) {
    return null;
  }

  HandleDeclarator(node: IUniNode): unknown {
    return null;
  }

  HandleOperation(node: IUniNode): unknown {
    return null;
  }

  Handle(node: IUniNode): unknown {
    switch (node.kind) {
      case "type": {
        return this.HandleType(node);
      }

      case "view": {
        return this.HandleView(node);
      }

      case "provider": {
        return this.HandleProvider(node);
      }

      case "declarator": {
        return this.HandleDeclarator(node);
      }

      case "operation": {
        return this.HandleOperation(node);
      }

      default: {
        return null;
      }
    }
  }
}
