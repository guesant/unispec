import { Int, type GqlTypeReference } from "@nestjs/graphql";
import { CheckType } from "@unispec/ast-builder";
import type { IUniNode, IUniNodeTypeArray, IUniNodeTypeBoolean, IUniNodeTypeInteger, IUniNodeTypeObject, IUniNodeTypeReference, IUniNodeTypeString, IUniNodeView } from "@unispec/ast-types";
import { CompileNode } from "@unispec/ast-utils";

export type ICompiledNodeGraphQlRepresentation = {
  type: void | (() => GqlTypeReference);
  nullable: boolean;
};

type Meta = Record<string, any>;

export class CompileNodeGraphQlRepresentation extends CompileNode<Meta> {
  protected HandleGenericType(node: IUniNode, _meta: any, base: Pick<ICompiledNodeGraphQlRepresentation, "type"> & Partial<ICompiledNodeGraphQlRepresentation>): ICompiledNodeGraphQlRepresentation {
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

  protected HandleTypeString(node: IUniNodeTypeString, meta?: Meta): ICompiledNodeGraphQlRepresentation {
    switch (node.format) {
      case "date-time": {
        return this.HandleGenericType(node, meta, { type: () => Date });
      }

      default: {
        return this.HandleGenericType(node, meta, { type: () => String });
      }
    }
  }

  protected HandleTypeInteger(node: IUniNodeTypeInteger, meta?: Meta): ICompiledNodeGraphQlRepresentation {
    return this.HandleGenericType(node, meta, { type: () => Int });
  }

  protected HandleTypeBoolean(node: IUniNodeTypeBoolean, meta?: Meta): ICompiledNodeGraphQlRepresentation {
    return this.HandleGenericType(node, meta, { type: () => Boolean });
  }

  protected HandleTypeArray(node: IUniNodeTypeArray, meta?: Meta): ICompiledNodeGraphQlRepresentation {
    const nested = this.Handle(node.items, meta);
    const nestedType = nested.type;

    if (nestedType) {
      return this.HandleGenericType(node, meta, { type: () => [nestedType()] });
    }

    return this.HandleGenericType(node, meta, { type: void 0 });
  }

  protected HandleTypeReference(node: IUniNodeTypeReference, meta?: Meta): ICompiledNodeGraphQlRepresentation {
    const dereferenced = this.repository.GetRealTarget(node);

    if (dereferenced) {
      return this.Handle(dereferenced, meta);
    }

    return this.OnUnhandled(node, meta);
  }

  protected HandleTypeObject(node: IUniNodeTypeObject, meta?: Meta) {
    const partialOf = node.partialOf;

    const partialOfTarget = partialOf ? this.repository.GetRealTarget(partialOf) : null;

    if (partialOfTarget) {
      return super.Handle(partialOfTarget, meta);
    }

    return super.HandleTypeObject(node, meta);
  }

  protected HandleView(node: IUniNodeView, meta?: Meta): ICompiledNodeGraphQlRepresentation {
    const ctor = this.classCompiler.CompileCtor(node, null, meta);

    return this.HandleGenericType(node, meta, { type: () => ctor });
  }

  Handle(node: IUniNode, meta?: Meta): ICompiledNodeGraphQlRepresentation {
    const dt = <ICompiledNodeGraphQlRepresentation | null>super.Handle(node, meta);

    if (dt) {
      return dt;
    }

    return this.HandleGenericType(node, meta, { type: void 0 });
  }
}
