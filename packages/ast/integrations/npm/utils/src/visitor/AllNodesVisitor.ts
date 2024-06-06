import type { IUniNode, IUniNodeProvider, IUniNodeProviderContext, IUniNodeTypeArray, IUniNodeTypeObject } from "@unispec/ast-types";
import { CastIterable, type MayBeIterable } from "../helpers";
import { NodeVisitor } from "./NodeVisitor";

export type INodesEntrypoint = MayBeIterable<IUniNode | undefined | null>;

export type IExtractAllNodesContext = {
  nodesVisited: Set<IUniNode>;
  nodesToVisit: Set<IUniNode>;
};

export class AllNodesVisitor extends NodeVisitor<IExtractAllNodesContext> {
  OnUnhandled() {}

  protected HandleProvider(node: IUniNodeProvider, context?: IExtractAllNodesContext) {
    const providerContext: IUniNodeProviderContext = {
      Add: (node: IUniNode) => {
        context?.nodesToVisit.add(node);
        return providerContext;
      },
    };

    node.fn(providerContext);
  }

  protected HandleTypeObject(node: IUniNodeTypeObject, context?: IExtractAllNodesContext | undefined) {
    for (const [, propertyNode] of Object.entries(node.properties)) {
      context?.nodesToVisit.add(propertyNode);
    }
  }

  protected HandleTypeArray(node: IUniNodeTypeArray, context?: IExtractAllNodesContext | undefined) {
    context?.nodesToVisit.add(node.items);
  }

  static createExtractAllNodesContext(): IExtractAllNodesContext {
    return {
      nodesVisited: new Set<IUniNode>(),
      nodesToVisit: new Set<IUniNode>(),
    };
  }

  static *VisitAll(entrypoint: INodesEntrypoint, visitor = new AllNodesVisitor()): Iterable<IUniNode> {
    const context = this.createExtractAllNodesContext();

    const entrypointIterable = CastIterable(entrypoint) as Iterable<IUniNode | void>;

    for (const node of entrypointIterable) {
      if (node) {
        context.nodesToVisit.add(node);
      }
    }

    while (context.nodesToVisit.size > 0) {
      const node: IUniNode = context.nodesToVisit.values().next().value;

      if (!context.nodesVisited.has(node)) {
        context.nodesVisited.add(node);

        yield node;

        visitor.Handle(node, context);
      }

      context.nodesToVisit.delete(node);
    }
  }
}
