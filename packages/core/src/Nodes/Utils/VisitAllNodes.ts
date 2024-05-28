import type { IUniNodeProviderContext} from "../Kinds";
import { IsUniNodeObjectLike } from "../Kinds";
import type { IUniNode } from "../Node";

const castIterable = <T extends object>(v: T | Iterable<T>) => (Symbol.iterator in v ? v : [v]);

export const VisitAllNodes = function* (entrypoint: IUniNode | Iterable<IUniNode>) {
  const nodesVisited = new Set<IUniNode>();

  const nodesToVisit = new Set<IUniNode>(castIterable(entrypoint));

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
