import { type IUniNode, VisitAllNodes } from "@unispec/core";
import { CastIterable } from "../-Helpers/CastIterable";

type IRepositoryEntrypoint = IUniNode | Iterable<IUniNode> | undefined | null;

export class UniRepository {
  #nodes = new Set<IUniNode>();

  *getNodes(): Iterable<IUniNode> {
    yield* this.#nodes;
  }

  get Nodes(): Iterable<IUniNode> {
    return this.getNodes();
  }

  constructor(
    entrypoint?: IRepositoryEntrypoint,
    public visitAll = true,
  ) {
    this.Add(entrypoint, visitAll);
  }

  Add(entrypoint: IRepositoryEntrypoint, visitAll = this.visitAll): this {
    if (entrypoint) {
      const nodesIterable = visitAll ? VisitAllNodes(entrypoint) : CastIterable(entrypoint);

      for (const node of nodesIterable) {
        this.#nodes.add(node);
      }
    }

    return this;
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
