import { AllNodesVisitor, JsonSchemaGenerator } from "@unispec/compiler";
import { IsUniNodeView, type IUniNode } from "@unispec/core";
import { InputData, JSONSchemaInput } from "quicktype-core";
import { UnispecStore } from "./UnispecStore";

export class UnispecInput extends JSONSchemaInput {
  constructor(public store: UnispecStore) {
    super(store);
  }

  async AddNode(node: IUniNode): Promise<void> {
    if (IsUniNodeView(node)) {
      const jsonSchemaType = this.store.generator.Compile(node);

      const jsonSchemaTypeAsString = JSON.stringify(jsonSchemaType, null, 2);

      await this.addSource({ name: node.name, schema: jsonSchemaTypeAsString });
    }
  }

  async AddFromEntryPoint(entrypoint: IUniNode | Iterable<IUniNode>) {
    const nodes = AllNodesVisitor.VisitAll(entrypoint);

    for (const node of nodes) {
      await this.AddNode(node);
    }
  }

  GetInputData() {
    const inputData = new InputData();
    inputData.addInput(this);
    return inputData;
  }

  static async FromEntrypoint(entrypoint: IUniNode | Iterable<IUniNode>, visitAll?: boolean, generator?: JsonSchemaGenerator) {
    const store = await UnispecStore.FromEntrypoint(entrypoint, visitAll, generator);
    return new UnispecInput(store);
  }
}
