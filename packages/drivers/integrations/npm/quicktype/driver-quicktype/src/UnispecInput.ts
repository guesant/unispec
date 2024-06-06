import { CheckView } from "@unispec/ast-builder";
import { type IUniNode } from "@unispec/ast-types";
import { UniRepository, type IUniRepositoryEntrypoint } from "@unispec/ast-utils";
import { InputData, JSONSchemaInput } from "quicktype-core";
import { UnispecStore } from "./UnispecStore";

export class UnispecInput extends JSONSchemaInput {
  constructor(public store: UnispecStore) {
    super(store);
  }

  async AddNode(node: IUniNode): Promise<void> {
    if (CheckView(node)) {
      const jsonSchemaType = this.store.generator.Compile(node);

      const jsonSchemaTypeAsString = JSON.stringify(jsonSchemaType, null, 2);

      await this.addSource({ name: node.name, schema: jsonSchemaTypeAsString });
    }
  }

  async AddFromEntryPoint(entrypoint: IUniRepositoryEntrypoint, visitAll: boolean = true) {
    const repository = new UniRepository(entrypoint, visitAll);

    for (const node of repository.Nodes) {
      await this.AddNode(node);
    }
  }

  GetInputData() {
    const inputData = new InputData();
    inputData.addInput(this);
    return inputData;
  }
}
