import { IToken } from "../Nodes";

export const TravelNode = (baseNode: IToken) => {
  const nodesVisited = new Set<IToken>();

  const nodesToVisit = new Set<IToken>([baseNode]);

  while (nodesToVisit.size > 0) {
    const node: IToken = nodesToVisit.values().next().value;

    if (!nodesVisited.has(node)) {
      if (node.kind === "provider") {
        const ctx = {
          Add(node: IToken) {
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
