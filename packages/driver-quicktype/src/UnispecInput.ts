import { AllNodesVisitor, JsonSchemaGenerator } from "@unispec/compiler";
import { IsUniNodeView, type IUniNode } from "@unispec/core";
import { FetchingJSONSchemaStore, InputData, JSONSchemaInput } from "quicktype-core";

export class UnispecInput {
  constructor(
    public generator = new JsonSchemaGenerator(),
    public jsonSchemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore()),
  ) {}

  async AddNode(node: IUniNode): Promise<void> {
    if (IsUniNodeView(node)) {
      const jsonSchemaType = this.generator.Compile(node);

      const jsonSchemaTypeAsString = JSON.stringify(jsonSchemaType, null, 2);

      await this.jsonSchemaInput.addSource({
        name: node.name,
        schema: jsonSchemaTypeAsString,
      });
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
    inputData.addInput(this.jsonSchemaInput);
    return inputData;
  }

  static async GetFromEntryPoint(entrypoint: IUniNode | Iterable<IUniNode>) {
    const unispecInput = new UnispecInput();
    await unispecInput.AddFromEntryPoint(entrypoint);
    return unispecInput;
  }

  static async GetJsonSchemaInputFromEntryPoint(entrypoint: IUniNode | Iterable<IUniNode>) {
    const unispecInput = await UnispecInput.GetFromEntryPoint(entrypoint);
    return unispecInput.jsonSchemaInput;
  }

  static async GetInputDataFromEntryPoint(entrypoint: IUniNode | Iterable<IUniNode>) {
    const unispecInput = await UnispecInput.GetFromEntryPoint(entrypoint);
    return unispecInput.GetInputData();
  }
}
