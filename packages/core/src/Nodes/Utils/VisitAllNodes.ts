import { IUniNodeProviderContext } from "../Kinds";
import { IUniNode } from "../Node";
import { IsUniNodeObjectLike } from "./TypeObjectUtils";

export const VisitAllNodes = function* (entrypoint: IUniNode | Iterable<IUniNode>) {
  const nodesVisited = new Set<IUniNode>();

  const nodesToVisit = new Set<IUniNode>(Symbol.iterator in entrypoint ? entrypoint : [entrypoint]);

  while (nodesToVisit.size > 0) {
    const node: IUniNode = nodesToVisit.values().next().value;

    if (!nodesVisited.has(node)) {
      if (node.kind === "provider") {
        const ctx: IUniNodeProviderContext = {
          Add(node: IUniNode) {
            nodesToVisit.add(node);
            return ctx;
          },
        };

        node.fn(ctx);
      }

      if (IsUniNodeObjectLike(node)) {
        for (const [, propertyNode] of Object.entries(node.properties)) {
          nodesToVisit.add(propertyNode);
        }
      }

      nodesVisited.add(node);
    }

    nodesToVisit.delete(node);
  }

  yield* nodesVisited;
};
