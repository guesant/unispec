import type {
  IUniNode,
  IUniNodeModule,
  IUniNodeNull,
  IUniNodeOperation,
  IUniNodeProvider,
  IUniNodeType,
  IUniNodeTypeArray,
  IUniNodeTypeBoolean,
  IUniNodeTypeFile,
  IUniNodeTypeInteger,
  IUniNodeTypeObject,
  IUniNodeTypeString,
  IUniNodeView,
} from "@unispec/ast-types";

export class NodeVisitor<Context = never> {
  constructor(readonly throwOnUnhandled: boolean = true) {}

  OnUnhandled(node: IUniNode, context?: Context): any;

  OnUnhandled(node: IUniNode) {
    if (this.throwOnUnhandled) {
      throw new Error(`Unhandled ${JSON.stringify(node, null, 2)}.`);
    }
  }

  protected HandleTypeString(node: IUniNodeTypeString, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleTypeInteger(node: IUniNodeTypeInteger, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleTypeBoolean(node: IUniNodeTypeBoolean, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleTypeArray(node: IUniNodeTypeArray, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleTypeFile(node: IUniNodeTypeFile, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleTypeObject(node: IUniNodeTypeObject, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleType(node: IUniNodeType, context?: Context): any {
    switch (node.type) {
      case "string": {
        return this.HandleTypeString(node, context);
      }

      case "integer": {
        return this.HandleTypeInteger(node, context);
      }

      case "boolean": {
        return this.HandleTypeBoolean(node, context);
      }

      case "array": {
        return this.HandleTypeArray(node, context);
      }

      case "reference": {
        return this.HandleTypeReference(node, context);
      }

      case "file": {
        return this.HandleTypeFile(node, context);
      }

      case "object": {
        return this.HandleTypeObject(node, context);
      }

      default: {
        return this.OnUnhandled(node, context);
      }
    }
  }

  protected HandleView(node: IUniNodeView, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleTypeReference(node: IUniNodeType, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleProvider(node: IUniNodeProvider, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleOperation(node: IUniNodeOperation, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleNull(node: IUniNodeNull, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  protected HandleModule(node: IUniNodeModule, context?: Context): any {
    return this.OnUnhandled(node, context);
  }

  Handle(node: IUniNode, context?: Context): any {
    switch (node.kind) {
      case "type": {
        return this.HandleType(node, context);
      }

      case "view": {
        return this.HandleView(node, context);
      }

      case "provider": {
        return this.HandleProvider(node, context);
      }

      case "operation": {
        return this.HandleOperation(node, context);
      }

      case "null": {
        return this.HandleNull(node, context);
      }

      case "module": {
        return this.HandleModule(node, context);
      }

      default: {
        return this.OnUnhandled(node, context);
      }
    }
  }
}
