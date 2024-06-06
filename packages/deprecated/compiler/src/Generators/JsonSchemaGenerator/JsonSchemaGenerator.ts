import type { IUniNode } from "@unispec/core";
import { JsonSchemaCompiler } from "./JsonSchemaCompiler";

export class JsonSchemaGenerator {
  constructor(readonly compiler: JsonSchemaCompiler = new JsonSchemaCompiler()) {}

  Compile(node: IUniNode) {
    return this.compiler.Handle(node);
  }
}
