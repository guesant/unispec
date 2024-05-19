import { IUniNode } from "../Nodes";

export const TravelNode = (baseNode: IUniNode) => {
  const nodesVisited = new Set<IUniNode>();

  const nodesToVisit = new Set<IUniNode>([baseNode]);

  while (nodesToVisit.size > 0) {
    const node: IUniNode = nodesToVisit.values().next().value;

    if (!nodesVisited.has(node)) {
      if (node.kind === "provider") {
        const ctx = {
          Add(node: IUniNode) {
            nodesToVisit.add(node);
            return ctx;
          },
        };

        node.fn(ctx);
      }

      nodesVisited.add(node);
    }

    nodesToVisit.delete(node);
  }

  return { nodesVisited: Array.from(nodesVisited) };
};
