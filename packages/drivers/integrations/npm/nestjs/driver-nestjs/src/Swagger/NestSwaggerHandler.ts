import { ApiProperty } from "@nestjs/swagger";
import { IsUniNodeType } from "@unispec/core";
import { CompileClassHandler, type ICompileClassHandlerPropertyContext } from "../../../../../../../deprecated/compiler/dist";
import { CompileNodeSwaggerType } from "./CompileNodeSwaggerType";

export class NestSwaggerHandler extends CompileClassHandler {
  compilePropertyDecorators(context: ICompileClassHandlerPropertyContext): any[] | null {
    const compileNodeSwaggerType = new CompileNodeSwaggerType(context.host.repository, context.host);

    const swagger = compileNodeSwaggerType.Handle(context.propertyNode);

    const type = swagger?.type;

    if (type) {
      const propertyNode = context.propertyNode;

      if (IsUniNodeType(propertyNode)) {
        return [
          ApiProperty({
            ...swagger,
            required: propertyNode.required,
            nullable: propertyNode.nullable,
            description: propertyNode.description,
          }),
        ];
      }
    }

    return [];
  }
}
