import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CompileClassHandler, type ICompileClassHandlerCtorContext, type ICompileClassHandlerPropertyContext } from "@unispec/compiler";
import { IsUniNodeType } from "@unispec/core";
import { CompileNodeGqlType } from "./CompileNodeGqlType";

export class NestGraphQlHandler extends CompileClassHandler {
  constructor() {
    super();
  }

  compileCtorDecorators(context: ICompileClassHandlerCtorContext) {
    const classDecorators = [];

    if (context.meta?.gqlStrategy === "args-type") {
      classDecorators.push(ArgsType());
    } else if (context.meta?.mode === "input") {
      classDecorators.push(InputType(context.meta?.className));
    } else if (context.meta?.mode === "output" || context.meta?.mode === "simple") {
      classDecorators.push(ObjectType(context.meta?.className));
    }

    return classDecorators;
  }

  compilePropertyDecorators(context: ICompileClassHandlerPropertyContext): any[] | null;

  compilePropertyDecorators(context: ICompileClassHandlerPropertyContext): any[] | null {
    const compileNodeGqlType = new CompileNodeGqlType(context.host.repository, context.host);

    const gql = compileNodeGqlType.Handle(context.propertyNode);

    const type = gql?.type;

    if (type) {
      const propertyNode = context.propertyNode;

      if (IsUniNodeType(propertyNode)) {
        return [
          Field(type, {
            nullable: propertyNode.nullable || !propertyNode.required,
            description: propertyNode.description,
          }),
        ];
      }
    }

    return [];
  }
}
