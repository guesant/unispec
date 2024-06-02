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

  FindByName(name: string) {
    for (const node of this.Nodes) {
      if (node.kind === "view" && node.name === name) {
        return node;
      }
    }

    return null;
  }

  protected GetReferenceTargetsTo(cursor: IUniNode | string) {
    if (typeof cursor === "string") {
      return cursor;
    }

    if (cursor.kind === "type" && cursor.type === "reference") {
      return cursor.targetsTo;
    }

    return null;
  }

  GetRealTarget(cursor: IUniNode | string): IUniNode | null {
    let targetNode: IUniNode | null = null;

    const referenceTargetsTo = this.GetReferenceTargetsTo(cursor);

    if (referenceTargetsTo) {
      targetNode = this.FindByName(referenceTargetsTo);

      if (!targetNode) {
        throw new Error(`Can't find target for cursor '${cursor}' that targets to '${referenceTargetsTo}'.`);
      }
    } else {
      if (typeof cursor !== "string") {
        targetNode = cursor;
      }
    }

    if (!targetNode) {
      throw new Error("Invalid target for cursor " + cursor);
    }

    return targetNode;
  }
}
