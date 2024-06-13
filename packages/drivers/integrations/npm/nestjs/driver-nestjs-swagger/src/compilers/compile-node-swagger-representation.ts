import type { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { CheckType, CheckView } from "@unispec/ast-builder";
import type { IUniNode, IUniNodeTypeArray, IUniNodeTypeReference, IUniNodeTypeString, IUniNodeView } from "@unispec/ast-types";
import { CompileNode } from "@unispec/ast-utils";

export type ICompiledNodeSwaggerRepresentation =
  | SchemaObject
  | {
      type?: any | [any] | string;
      isArray?: boolean;
    }
  | any;

type Meta = Record<string, any>

export class CompileNodeSwaggerRepresentation extends CompileNode<Meta> {
  protected HandleTypeString(node: IUniNodeTypeString): ICompiledNodeSwaggerRepresentation {
    const type = "string";

    switch (node.format) {
      case "date-time":
      case "uuid":
      case "e-mail":
      case "time":
      case "date": {
        return {
          type,
          format: node.format,
        };
      }

      default: {
        return {
          type,
        };
      }
    }
  }

  protected HandleTypeInteger(): ICompiledNodeSwaggerRepresentation {
    return {
      type: "integer",
    };
  }

  protected HandleTypeBoolean(): ICompiledNodeSwaggerRepresentation {
    return {
      type: "boolean",
    };
  }

  protected HandleTypeArray(node: IUniNodeTypeArray, meta?: Meta): ICompiledNodeSwaggerRepresentation {
    const nested = this.Handle(node.items, meta);

    return {
      ...nested,
      isArray: true,
    };
  }

  protected HandleTypeReference(node: IUniNodeTypeReference, meta?: Meta) {
    const dereferenced = this.repository.GetRealTarget(node);

    if (dereferenced) {
      if (CheckType(dereferenced)) {
        return this.Handle(
          {
            ...dereferenced,
            required: node.required,
            nullable: node.nullable,
            description: node.description,
          },
          meta,
        );
      } else if (CheckView(dereferenced) && CheckType(dereferenced.type)) {
        return this.Handle(
          {
            ...dereferenced,
            type: {
              ...dereferenced.type,
              required: node.required,
              nullable: node.nullable,
              description: node.description,
            },
          },
          meta,
        );
      } else {
        return this.Handle(dereferenced, meta);
      }
    }

    return this.OnUnhandled(node, meta);
  }

  protected HandleView(node: IUniNodeView, meta?: Record<string, any>): ICompiledNodeSwaggerRepresentation {
    const ctor = this.classCompiler.CompileCtor(node, null, meta);

    return {
      type: () => ctor,
    };
  }

  Handle(node: IUniNode, meta?: Meta): ICompiledNodeSwaggerRepresentation | null {
    return <ICompiledNodeSwaggerRepresentation | null>super.Handle(node, meta);
  }
}
