import { Int, type GqlTypeReference } from "@nestjs/graphql";
import { CompileNode } from "@unispec/compiler";
import { type IUniNode, type IUniNodeTypeArray, type IUniNodeView } from "@unispec/core";

export type ICompiledNodeGqlType = {
  type: void | (() => GqlTypeReference);
};

export class CompileNodeGqlType extends CompileNode {
  HandleTypeString() {
    return {
      type: () => String,
    };
  }

  HandleTypeInteger(): ICompiledNodeGqlType {
    return {
      type: () => Int,
    };
  }

  HandleTypeBoolean(): ICompiledNodeGqlType {
    return {
      type: () => Boolean,
    };
  }

  HandleTypeArray(node: IUniNodeTypeArray): ICompiledNodeGqlType {
    const nested = this.Handle(node.items);

    return {
      type: () => [nested.type],
    };
  }

  HandleView(node: IUniNodeView): ICompiledNodeGqlType {
    const ctor = this.classCompiler.CompileCtor(node);

    return {
      type: () => ctor,
    };
  }

  Handle(node: IUniNode): ICompiledNodeGqlType {
    const dt = <ICompiledNodeGqlType | null>super.Handle(node);

    if (dt) {
      return dt;
    }

    return {
      type: void 0,
    };
  }
}
