import type { IUniNode, IUniNodeProvider, IUniNodeProviderContext, IUniNodeTypeArray, IUniNodeTypeObject } from "@unispec/core";
import { CastIterable, type MayBeIterable } from "../-Helpers";
import { NodeVisitor } from "./NodesVisitor";

export type INodesEntrypoint = MayBeIterable<IUniNode | undefined | null>;

export type IExtractAllNodesContext = {
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

  static *VisitAll(entrypoint: INodesEntrypoint, visitor = new AllNodesVisitor()): Iterable<IUniNode> {
    const ctx = this.createExtractAllNodesContext();

    const entrypointIterable = CastIterable(entrypoint) as Iterable<IUniNode | void>;

    for (const node of entrypointIterable) {
      if (node) {
        ctx.nodesToVisit.add(node);
      }
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
