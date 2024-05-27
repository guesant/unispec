import type { IUniNode } from "@unispec/core";
import type { UniRepository } from "../../Repository";
import { JsonSchemaCompiler } from "./JsonSchemaCompiler";

export class JsonSchemaGenerator {
  constructor(
    readonly repository: UniRepository,
    readonly compiler: JsonSchemaCompiler = new JsonSchemaCompiler(repository),
  ) {}

  Compile(node: IUniNode) {
    return this.compiler.Handle(node);
  }
}
