import { Int, type GqlTypeReference } from "@nestjs/graphql";
import type { IUniNode, IUniNodeTypeArray, IUniNodeView } from "@unispec/ast-types";
import { CompileNode } from "@unispec/ast-utils";

export type ICompiledNodeGqlRepresentation = {
  type: void | (() => GqlTypeReference);
};

export type ICompileNodeGqlRepresentationContext = {
  meta?: Record<string, any>;
};

export class CompileNodeGqlRepresentation extends CompileNode<ICompileNodeGqlRepresentationContext> {
  HandleTypeString() {
    return {
      type: () => String,
    };
  }

  HandleTypeInteger(): ICompiledNodeGqlRepresentation {
    return {
      type: () => Int,
    };
  }

  HandleTypeBoolean(): ICompiledNodeGqlRepresentation {
    return {
      type: () => Boolean,
    };
  }

  HandleTypeArray(node: IUniNodeTypeArray): ICompiledNodeGqlRepresentation {
    const nested = this.Handle(node.items);

    return {
      type: () => [nested.type],
    };
  }

  HandleView(node: IUniNodeView, meta?: Record<string, any>): ICompiledNodeGqlRepresentation {
    const ctor = this.classCompiler.CompileCtor(node, null, meta);

    return {
      type: () => ctor,
    };
  }

  Handle(node: IUniNode): ICompiledNodeGqlRepresentation {
    const dt = <ICompiledNodeGqlRepresentation | null>super.Handle(node);

    if (dt) {
      return dt;
    }

    return {
      type: void 0,
    };
  }
}
