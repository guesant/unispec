import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CheckType, CheckTypeObject, CheckView } from "@unispec/ast-builder";
import type { IUniNode } from "@unispec/ast-types";
import { CompileClassHandler, type ICompileClassContext } from "@unispec/ast-utils";
import { CompileNodeGraphQlRepresentation } from "./compile-node-graphql-representation";

export class CompileClassHandlerGraphQlDto extends CompileClassHandler {
  constructor() {
    super();
  }

  GetNodeName(context: ICompileClassContext) {
    return context.host.GetNodeName(context);
  }

  HandleCtor(context: ICompileClassContext, parent?: string | null | undefined): void {
    this.HandleCtorMetadata(context, parent);
    this.HandleCtorProperties(context, parent);
  }

  protected HandleCtorMetadata(context: ICompileClassContext, parent?: string | null | undefined) {
    const gqlName = this.GetNodeName(context);

    if (gqlName) {
      if (context.meta?.gqlStrategy === "args-type") {
        context.AddCtorDecorator(ArgsType());
      } else if (context.meta?.mode === "input") {
        context.AddCtorDecorator(InputType(gqlName));
      } else if (context.meta?.mode === "output" || context.meta?.mode === "simple") {
        context.AddCtorDecorator(ObjectType(gqlName));
      }
    }
  }

  protected HandleCtorProperties(context: ICompileClassContext, parent?: string | null | undefined): void {
    const contextNode = context.node;

    let targetNode: IUniNode | null = null;

    if (CheckView(contextNode)) {
      const contextNodeViewTypeRealTarget = context.repository.GetRealTarget(contextNode.type);

      if (CheckTypeObject(contextNodeViewTypeRealTarget)) {
        targetNode = contextNodeViewTypeRealTarget;
      }
    }

    if (CheckTypeObject(targetNode)) {
      const partialOf = targetNode.partialOf;

      const partialOfRealTarget = partialOf ? context.repository.GetRealTarget(partialOf) : null;

      if (partialOfRealTarget && CheckTypeObject(partialOfRealTarget)) {
        targetNode = partialOfRealTarget;
      }
    }

    if (CheckTypeObject(targetNode)) {
      const compileNodeGqlType = new CompileNodeGraphQlRepresentation(context.host.repository, context.host);

      for (const [propertyKey, propertyNode] of Object.entries(targetNode.properties)) {
        const gql = compileNodeGqlType.Handle(propertyNode, { ...context.meta, gqlStrategy: "none" });

        const gqlTypeFn = gql?.type;

        if (gqlTypeFn) {
          if (CheckType(propertyNode)) {
            context.AddPropertyDecorator(
              propertyKey,
              Field(gqlTypeFn, {
                nullable: propertyNode.nullable || !propertyNode.required,
                description: propertyNode.description,
              }),
            );
          } else {
            context.AddPropertyDecorator(propertyKey, Field(gqlTypeFn));
          }
        }
      }
    }
  }
}
