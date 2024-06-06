import type { IUniNodeTypeObject } from "@unispec/ast-types";
import type { PartialDeep } from "type-fest";
import { UniNodeTypeObjectPartial, UniNodeTypeObjectPick } from "./UniNodeTypeObjectUtils";
import { DeepAssign } from "./utils/deep-assign";
import { UniExtends } from "./UniExtends";

export class UniNodeObjectTransformer<Current extends IUniNodeTypeObject> {
  #current: Current | null = null;

  static From<K extends IUniNodeTypeObject>(node: K) {
    return new UniNodeObjectTransformer().With(node);
  }

  get current() {
    if (this.#current === null) {
      throw new Error("ObjectTransformer is not initialized.");
    }

    return this.#current;
  }

  constructor(current?: Current) {
    if (current) {
      this.#current = current;
    }
  }

  With<K extends IUniNodeTypeObject>(node: K) {
    return new UniNodeObjectTransformer(node);
  }

  Pipe<Next extends IUniNodeTypeObject>(transformer: (current: Current) => Next) {
    return new UniNodeObjectTransformer(transformer(this.current));
  }

  Pick<Properties extends keyof Current["properties"]>(propertiesToPick: Properties[] | Record<Properties, boolean>) {
    return this.Pipe((current) => UniNodeTypeObjectPick(current, propertiesToPick));
  }

  Partial() {
    return this.Pipe((current) => UniNodeTypeObjectPartial(current));
  }

  Merge<Other extends IUniNodeTypeObject>(otherNode: Other) {
    return this.Pipe((current) => DeepAssign(current, otherNode));
  }

  Extends(...otherNodes: PartialDeep<Current | IUniNodeTypeObject>[]) {
    return this.Pipe((current) => UniExtends(current, ...otherNodes));
  }

  Node() {
    return this.current;
  }
}
