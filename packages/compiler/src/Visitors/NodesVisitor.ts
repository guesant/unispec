import type {
  IUniNode,
  IUniNodeDeclarator,
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
} from "@unispec/core";

export class NodeVisitor<Ctx = never> {
  constructor(readonly throwOnUnhandled: boolean = true) {}

  OnUnhandled(node: IUniNode, ctx?: Ctx): any;

  OnUnhandled(node: IUniNode) {
    if (this.throwOnUnhandled) {
      throw new Error(`Unhandled ${JSON.stringify(node, null, 2)}.`);
    }
  }

  protected HandleTypeString(node: IUniNodeTypeString, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleTypeInteger(node: IUniNodeTypeInteger, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleTypeBoolean(node: IUniNodeTypeBoolean, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleTypeArray(node: IUniNodeTypeArray, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleTypeFile(node: IUniNodeTypeFile, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleTypeObject(node: IUniNodeTypeObject, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleType(node: IUniNodeType, ctx?: Ctx): any {
    switch (node.type) {
      case "string": {
        return this.HandleTypeString(node, ctx);
      }

      case "integer": {
        return this.HandleTypeInteger(node, ctx);
      }

      case "boolean": {
        return this.HandleTypeBoolean(node, ctx);
      }

      case "array": {
        return this.HandleTypeArray(node, ctx);
      }

      case "reference": {
        return this.HandleTypeReference(node, ctx);
      }

      case "file": {
        return this.HandleTypeFile(node, ctx);
      }

      case "object": {
        return this.HandleTypeObject(node, ctx);
      }

      default: {
        return this.OnUnhandled(node, ctx);
      }
    }
  }

  protected HandleView(node: IUniNodeView, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleTypeReference(node: IUniNodeType, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleProvider(node: IUniNodeProvider, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleDeclarator(node: IUniNodeDeclarator, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleOperation(node: IUniNodeOperation, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  protected HandleNull(node: IUniNodeNull, ctx?: Ctx): any {
    return this.OnUnhandled(node, ctx);
  }

  Handle(node: IUniNode, ctx?: Ctx): any {
    switch (node.kind) {
      case "type": {
        return this.HandleType(node, ctx);
      }

      case "view": {
        return this.HandleView(node, ctx);
      }

      case "provider": {
        return this.HandleProvider(node, ctx);
      }

      case "declarator": {
        return this.HandleDeclarator(node, ctx);
      }

      case "operation": {
        return this.HandleOperation(node, ctx);
      }

      case "null": {
        return this.HandleNull(node, ctx);
      }

      default: {
        return this.OnUnhandled(node, ctx);
      }
    }
  }
}
