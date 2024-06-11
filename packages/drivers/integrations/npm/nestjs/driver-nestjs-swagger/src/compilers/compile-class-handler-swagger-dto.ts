import { ApiProperty } from "@nestjs/swagger";
import { CheckType } from "@unispec/ast-builder";
import { CompileClassHandler, type ICompileClassHandlerPropertyContext } from "@unispec/ast-utils";
import { CompileNodeSwaggerRepresentation } from "./compile-node-swagger-representation";

export class CompileClassHandlerSwaggerDto extends CompileClassHandler {
  GetCompileNodeSwaggerRepresentation(context: ICompileClassHandlerPropertyContext) {
    return new CompileNodeSwaggerRepresentation(context.host.repository, context.host);
  }

  compilePropertyDecorators(context: ICompileClassHandlerPropertyContext): any[] | null {
    const compileNodeSwaggerRepresentation = this.GetCompileNodeSwaggerRepresentation(context);

    const swaggerRepresentation = compileNodeSwaggerRepresentation.Handle(context.propertyNode, context.meta);

    if (swaggerRepresentation) {
      const propertyNode = context.propertyNode;

      if (CheckType(propertyNode)) {
        return [
          ApiProperty({
            ...swaggerRepresentation,
            required: propertyNode.required,
            nullable: propertyNode.nullable,
            description: propertyNode.description,
          }),
        ];
      } else {
        return [ApiProperty(swaggerRepresentation)];
      }
    }

    return [];
  }
}
