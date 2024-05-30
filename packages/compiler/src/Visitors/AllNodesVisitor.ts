import type { IUniNode, IUniNodeProvider, IUniNodeProviderContext, IUniNodeTypeArray, IUniNodeTypeObject } from "@unispec/core";
import { CastIterable } from "../-Helpers";
import { NodeVisitor } from "./NodesVisitor";

type IExtractAllNodesContext = {
  nodesVisited: Set<IUniNode>;
  nodesToVisit: Set<IUniNode>;
};

export class AllNodesVisitor extends NodeVisitor<IExtractAllNodesContext> {
  OnUnhandled() {}

  protected HandleProvider(node: IUniNodeProvider, ctx?: IExtractAllNodesContext) {
    const providerCtx: IUniNodeProviderContext = {
      Add: (node: IUniNode) => {
        ctx?.nodesToVisit.add(node);
        return providerCtx;
      },
    };

    node.fn(providerCtx);
  }

  protected HandleTypeObject(node: IUniNodeTypeObject, ctx?: IExtractAllNodesContext | undefined) {
    for (const [, propertyNode] of Object.entries(node.properties)) {
      ctx?.nodesToVisit.add(propertyNode);
    }
  }

  protected HandleTypeArray(node: IUniNodeTypeArray, ctx?: IExtractAllNodesContext | undefined) {
    ctx?.nodesToVisit.add(node.items);
  }

  static createExtractAllNodesContext(): IExtractAllNodesContext {
    return {
      nodesVisited: new Set<IUniNode>(),
      nodesToVisit: new Set<IUniNode>(),
    };
  }

  static *VisitAll(entrypoint: IUniNode | Iterable<IUniNode>, visitor = new AllNodesVisitor()): Iterable<IUniNode> {
    const ctx = this.createExtractAllNodesContext();

    for (const node of CastIterable(entrypoint)) {
      ctx.nodesToVisit.add(node);
    }

    while (ctx.nodesToVisit.size > 0) {
      const node: IUniNode = ctx.nodesToVisit.values().next().value;

      if (!ctx.nodesVisited.has(node)) {
        ctx.nodesVisited.add(node);
        yield node;
        visitor.Handle(node, ctx);
      }

      ctx.nodesToVisit.delete(node);
    }
  }
}
