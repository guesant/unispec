import { ApiProperty } from "@nestjs/swagger";
import { CheckType, CheckTypeObject, CheckView } from "@unispec/ast-builder";
import type { IUniNode } from "@unispec/ast-types";
import { CompileClassHandler, type ICompileClassContext } from "@unispec/ast-utils";
import { CompileNodeSwaggerRepresentation } from "./compile-node-swagger-representation";

export class CompileClassHandlerSwaggerDto extends CompileClassHandler {
  GetCompileNodeSwaggerRepresentation(context: ICompileClassContext) {
    return new CompileNodeSwaggerRepresentation(context.host.repository, context.host);
  }

  GetNodeName(context: ICompileClassContext) {
    return context.host.GetNodeName(context);
  }

  HandleCtor(context: ICompileClassContext, parent?: string | null | undefined): void {
    this.HandleCtorProperties(context, parent);
  }

  HandleCtorProperties(context: ICompileClassContext, parent?: string | null | undefined) {
    const compileNodeSwaggerRepresentation = this.GetCompileNodeSwaggerRepresentation(context);

    const contextNode = context.node;

    let targetNode: IUniNode | null = null;

    if (CheckView(contextNode)) {
      const contextNodeViewTypeRealTarget = context.repository.GetRealTarget(contextNode.type);

      if (CheckTypeObject(contextNodeViewTypeRealTarget)) {
        targetNode = contextNodeViewTypeRealTarget;
      }
    }

    //

    if (CheckTypeObject(targetNode)) {
      for (const [propertyKey, propertyNode] of Object.entries(targetNode.properties)) {
        const swaggerRepresentation = compileNodeSwaggerRepresentation.Handle(propertyNode, context.meta);

        if (swaggerRepresentation) {
          if (CheckType(propertyNode)) {
            context.AddPropertyDecorator(
              propertyKey,
              ApiProperty({
                ...swaggerRepresentation,
                required: propertyNode.required,
                nullable: propertyNode.nullable,
                description: propertyNode.description,
              }),
            );
          } else {
            context.AddPropertyDecorator(propertyKey, ApiProperty(swaggerRepresentation));
          }
        }
      }
    }
  }
}
