import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CheckType } from "@unispec/ast-builder";
import { CompileClassHandler, type ICompileClassHandlerCtorContext, type ICompileClassHandlerPropertyContext } from "@unispec/ast-utils";
import { CompileNodeGraphQlRepresentation } from "./compile-node-graphql-representation";

export class CompileClassHandlerGraphQlDto extends CompileClassHandler {
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
    const compileNodeGqlType = new CompileNodeGraphQlRepresentation(context.host.repository, context.host);

    const gql = compileNodeGqlType.Handle(context.propertyNode, context);

    const type = gql?.type;

    if (type) {
      const propertyNode = context.propertyNode;

      if (CheckType(propertyNode)) {
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
