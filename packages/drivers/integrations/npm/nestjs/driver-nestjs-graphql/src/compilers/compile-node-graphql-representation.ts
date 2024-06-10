import { Int, type GqlTypeReference } from "@nestjs/graphql";
import type { IUniNode, IUniNodeTypeArray, IUniNodeView } from "@unispec/ast-types";
import { CompileNode } from "@unispec/ast-utils";

export type ICompiledNodeGraphQlRepresentation = {
  type: void | (() => GqlTypeReference);
};

export type ICompileNodeGraphQlRepresentationContext = {
  meta?: Record<string, any>;
};

export class CompileNodeGraphQlRepresentation extends CompileNode<ICompileNodeGraphQlRepresentationContext> {
  protected HandleTypeString() {
    return {
      type: () => String,
    };
  }

  protected HandleTypeInteger(): ICompiledNodeGraphQlRepresentation {
    return {
      type: () => Int,
    };
  }

  protected HandleTypeBoolean(): ICompiledNodeGraphQlRepresentation {
    return {
      type: () => Boolean,
    };
  }

  protected HandleTypeArray(node: IUniNodeTypeArray, context?: ICompileNodeGraphQlRepresentationContext): ICompiledNodeGraphQlRepresentation {
    const nested = this.Handle(node.items, context);

    return {
      type: () => [nested.type],
    };
  }

  protected HandleView(node: IUniNodeView, context?: Record<string, any>): ICompiledNodeGraphQlRepresentation {
    const ctor = this.classCompiler.CompileCtor(node, null, context);

    return {
      type: () => ctor,
    };
  }

  Handle(node: IUniNode, context?: ICompileNodeGraphQlRepresentationContext): ICompiledNodeGraphQlRepresentation {
    const dt = <ICompiledNodeGraphQlRepresentation | null>super.Handle(node, context);

    if (dt) {
      return dt;
    }

    return {
      type: void 0,
    };
  }
}
