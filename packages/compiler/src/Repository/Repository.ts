import { IUniNode, VisitAllNodes } from "@unispec/core";

type IRepositoryEntrypoint = IUniNode | Iterable<IUniNode> | undefined | null;

export class UniRepository {
  #nodes = new Set<IUniNode>();

  *getNodes(): Iterable<IUniNode> {
    yield* this.#nodes;
  }

  get Nodes(): Iterable<IUniNode> {
    return this.getNodes();
  }

  constructor(entrypoint?: IRepositoryEntrypoint) {
    this.Add(entrypoint);
  }

  Add(entrypoint: IRepositoryEntrypoint): this {
    if (entrypoint) {
      for (const node of VisitAllNodes(entrypoint)) {
        this.#nodes.add(node);
      }
    }

    return this;
  }

  GetRealTarget(cursor: IUniNode | string): IUniNode | null {
    throw new Error("Not implemented");
  }
}
