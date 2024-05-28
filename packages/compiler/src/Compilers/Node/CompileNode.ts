import type {
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
import type { UniRepository } from "../../Repository";
import { CompileClass } from "../Class";

export class CompileNode {
  constructor(
    readonly repository: UniRepository,
    readonly classCompiler: CompileClass = new CompileClass(),
  ) {}

  HandleTypeString(_: IUniNodeTypeString): unknown {
    return null;
  }

  HandleTypeInteger(_: IUniNodeTypeInteger): unknown {
    return null;
  }

  HandleTypeBoolean(_: IUniNodeTypeBoolean): unknown {
    return null;
  }

  HandleTypeArray(_: IUniNodeTypeArray): unknown {
    return null;
  }

  HandleTypeFile(_: IUniNodeTypeFile): unknown {
    return null;
  }

  HandleTypeObject(_: IUniNodeTypeObject): unknown {
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

  HandleView(_: IUniNodeView): unknown {
    return null;
  }

  HandleTypeReference(node: IUniNodeType) {
    const dereferenced = this.repository.GetRealTarget(node);

    if (dereferenced) {
      return this.Handle(dereferenced);
    }

    return null;
  }

  HandleProvider(_: IUniNodeProvider) {
    return null;
  }

  HandleDeclarator(_: IUniNode): unknown {
    return null;
  }

  HandleOperation(_: IUniNode): unknown {
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
