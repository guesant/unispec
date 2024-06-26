import type { IUniNode } from "@unispec/ast-types";
import { JsonSchemaCompiler } from "./json-schema-compiler";

export class JsonSchemaGenerator {
  constructor(readonly compiler: JsonSchemaCompiler = new JsonSchemaCompiler()) {}

  Compile(node: IUniNode, context?: any) {
    return this.compiler.Handle(node, context);
  }
}
