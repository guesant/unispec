import { CheckNamedBase, CheckTypeObject, CheckView } from "@unispec/ast-builder";
import { type IUniNode } from "@unispec/ast-types";
import { CastIterable } from "../helpers/CastIterable";
import { AllNodesVisitor, type INodesEntrypoint } from "../visitor";

export type IUniRepositoryLike = {
  Nodes: Iterable<IUniNode>;
};

export type IUniRepositoryEntrypoint = INodesEntrypoint | IUniRepositoryLike;

export const IsUniRepositoryLike = (node: unknown): node is IUniRepositoryLike => {
  if (node instanceof UniRepository) {
    return true;
  }

  const nodesIterable = node && Object.hasOwn(node, "Nodes") ? (<any>node).Nodes : null;

  if (nodesIterable) {
    if (Symbol.iterator in nodesIterable) {
      return true;
    }
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
          nodesIterable = visitAll ? AllNodesVisitor.VisitAll(entrypointNode, undefined) : CastIterable(entrypointNode);
        }

        for (const node of nodesIterable) {
          if (node) {
            if (!CheckNamedBase(node) || !this.FindByName(node.name)) {
              this.#nodes.add(node);
            }
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
      if (CheckNamedBase(node) && node.name === name) {
        return node;
      }
    }

    return null;
  }

  GetReferenceTargetsTo(cursor: IUniNode | string) {
    if (typeof cursor === "string") {
      return { targetsTo: cursor, objectProperty: null };
    }

    if (cursor.kind === "type" && cursor.type === "reference") {
      return { targetsTo: cursor.targetsTo, objectProperty: cursor.objectProperty ?? null };
    }

    return null;
  }

  GetRealTarget(cursor: IUniNode | string): IUniNode | null {
    let targetNode: IUniNode | null = null;

    do {
      const referenceTargetsTo = this.GetReferenceTargetsTo(cursor);

      if (referenceTargetsTo) {
        targetNode = this.FindByName(referenceTargetsTo.targetsTo);

        if (referenceTargetsTo.objectProperty) {
          if (!CheckView(targetNode)) {
            throw new Error(`Node is not a view: ${referenceTargetsTo.targetsTo}.`);
          }

          const targetNodeType = targetNode?.type;

          if (CheckTypeObject(targetNodeType) && Object.hasOwn(targetNodeType.properties, referenceTargetsTo.objectProperty)) {
            targetNode = targetNodeType.properties[referenceTargetsTo.objectProperty];
          } else {
            throw new Error(`Cursor targets to the property "${referenceTargetsTo.objectProperty}" of "${referenceTargetsTo.targetsTo}", but it was not found.`);
          }
        }
      } else {
        if (typeof cursor !== "string") {
          targetNode = cursor;
        }
      }
    } while (targetNode && this.GetReferenceTargetsTo(targetNode) !== null);

    return targetNode;
  }

  GetRealTargetStrict(cursor: IUniNode | string): IUniNode {
    const targetNode = this.GetRealTarget(cursor);

    if (!targetNode) {
      throw new Error(`Could not resolve real target of cursor ${cursor} (reference targets to ${this.GetReferenceTargetsTo(cursor)}).`);
    }

    return targetNode;
  }
}
