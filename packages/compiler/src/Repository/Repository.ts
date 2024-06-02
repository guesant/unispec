import { type IUniNode } from "@unispec/core";
import { CastIterable } from "../-Helpers/CastIterable";
import { AllNodesVisitor, type INodesEntrypoint } from "../Visitors";

export type IUniRepositoryLike = {
  Nodes: Iterable<IUniNode>;
};

export type IUniRepositoryEntrypoint = INodesEntrypoint | IUniRepositoryLike;

export const IsUniRepositoryLike = (node: unknown): node is IUniRepositoryLike => {
  if (node instanceof UniRepository) {
    return true;
  }

  if (Symbol.iterator in (<any>node)?.Nodes) {
    return true;
  }

  return false;
};

export class UniRepository {
  #nodes = new Set<IUniNode>();

  *getNodes(): Iterable<IUniNode> {
    yield* this.#nodes;
  }

  get Nodes(): Iterable<IUniNode> {
    return this.getNodes();
  }

  constructor(
    entrypoint?: IUniRepositoryEntrypoint,
    public visitAll = true,
  ) {
    this.Add(entrypoint, visitAll);
  }

  Add(entrypoints: IUniRepositoryEntrypoint, visitAll = this.visitAll): this {
    if (entrypoints) {
      const entrypointIterable = CastIterable(entrypoints);

      for (const entrypointNode of entrypointIterable) {
        let nodesIterable;

        if (IsUniRepositoryLike(entrypointNode)) {
          nodesIterable = entrypointNode.Nodes;
        } else {
          nodesIterable = visitAll ? AllNodesVisitor.VisitAll(entrypointNode) : CastIterable(entrypointNode);
        }

        for (const node of nodesIterable) {
          if (node) {
            this.#nodes.add(node);
          }
        }
      }
    }

    return this;
  }

  Contains(node: IUniNode) {
    for (const iterateNode of this.Nodes) {
      if (node === iterateNode) {
        return true;
      }
    }

    return false;
  }

  GetRealTarget(cursor: IUniNode | string): IUniNode | null {
    if (typeof cursor === "string" || (cursor.kind === "type" && cursor.type === "reference")) {
      let targetsTo: string | null = null;

      if (typeof cursor === "string") {
        targetsTo = cursor;
      } else {
        targetsTo = cursor.targetsTo;
      }

      if (typeof targetsTo !== "string") {
        throw new Error("Invalid target for cursor " + cursor);
      }

      for (const node of this.Nodes) {
        if (node.kind === "view" && node.name === targetsTo) {
          return node;
        }
      }

      throw new Error("Cannot find target for " + targetsTo);
    }

    return cursor;
  }
}
