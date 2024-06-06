import type { IUniNode } from "@unispec/core";
import { JSONSchemaStore, type JSONSchema } from "quicktype-core";
import { JsonSchemaGenerator, UniRepository } from "../../../../../../deprecated/compiler/dist";

export class UnispecStore extends JSONSchemaStore {
  constructor(
    public repository: UniRepository,
    public generator = new JsonSchemaGenerator(),
  ) {
    super();
  }

  async fetch(address: string | IUniNode): Promise<JSONSchema | undefined> {
    const targetNode = this.repository.GetRealTarget(address);

    if (targetNode) {
      const jsonSchemaType = this.generator.Compile(targetNode);
      return jsonSchemaType;
    }

    return undefined;
  }
}
