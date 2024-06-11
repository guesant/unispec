import { Int, type GqlTypeReference } from "@nestjs/graphql";
import { CheckType, CheckView } from "@unispec/ast-builder";
import type { IUniNode, IUniNodeTypeArray, IUniNodeTypeBoolean, IUniNodeTypeInteger, IUniNodeTypeReference, IUniNodeTypeString, IUniNodeView } from "@unispec/ast-types";
import { CompileNode } from "@unispec/ast-utils";

export type ICompiledNodeGraphQlRepresentation = {
  type: void | (() => GqlTypeReference);
  nullable: boolean;
};

export type ICompileNodeGraphQlRepresentationContext = {
  meta?: Record<string, any>;
};

export class CompileNodeGraphQlRepresentation extends CompileNode<ICompileNodeGraphQlRepresentationContext> {
  protected HandleGenericType(node: IUniNode, _context: any, base: Pick<ICompiledNodeGraphQlRepresentation, "type"> & Partial<ICompiledNodeGraphQlRepresentation>): ICompiledNodeGraphQlRepresentation {
    if (CheckType(node)) {
      return {
        nullable: node.nullable || !node.required,
        ...base,
      };
    }

    return {
      nullable: false,
      ...base,
    };
  }

  protected HandleTypeString(node: IUniNodeTypeString, context?: any): ICompiledNodeGraphQlRepresentation {
    return this.HandleGenericType(node, context, { type: () => String });
  }

  protected HandleTypeInteger(node: IUniNodeTypeInteger, context?: any): ICompiledNodeGraphQlRepresentation {
    return this.HandleGenericType(node, context, { type: () => Int });
  }

  protected HandleTypeBoolean(node: IUniNodeTypeBoolean, context?: any): ICompiledNodeGraphQlRepresentation {
    return this.HandleGenericType(node, context, { type: () => Boolean });
  }

  protected HandleTypeArray(node: IUniNodeTypeArray, context?: ICompileNodeGraphQlRepresentationContext): ICompiledNodeGraphQlRepresentation {
    const nested = this.Handle(node.items, context);
    return this.HandleGenericType(node, context, { type: () => [nested.type] });
  }

  protected HandleTypeReference(node: IUniNodeTypeReference, context?: any): ICompiledNodeGraphQlRepresentation {
    const dereferenced = this.repository.GetRealTarget(node);

    if (dereferenced) {
      if (CheckView(dereferenced)) {
        return this.Handle(dereferenced.type, context);
      } else {
        return this.Handle(dereferenced, context);
      }
    }

    return this.OnUnhandled(node, context);
  }

  protected HandleView(node: IUniNodeView, context?: Record<string, any>): ICompiledNodeGraphQlRepresentation {
    const ctor = this.classCompiler.CompileCtor(node, null, context);

    return this.HandleGenericType(node, context, { type: () => ctor });
  }

  Handle(node: IUniNode, context?: ICompileNodeGraphQlRepresentationContext): ICompiledNodeGraphQlRepresentation {
    const dt = <ICompiledNodeGraphQlRepresentation | null>super.Handle(node, context);

    if (dt) {
      return dt;
    }

    return this.HandleGenericType(node, context, { type: void 0 });
  }
}
