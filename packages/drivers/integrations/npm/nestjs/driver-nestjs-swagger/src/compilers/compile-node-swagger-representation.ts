import type { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { CheckType, CheckView } from "@unispec/ast-builder";
import type { IUniNode, IUniNodeType, IUniNodeTypeArray, IUniNodeTypeString, IUniNodeView } from "@unispec/ast-types";
import { CompileNode } from "@unispec/ast-utils";

export type ICompiledNodeSwaggerRepresentation =
  | SchemaObject
  | {
      type?: any | [any] | string;
      isArray?: boolean;
    }
  | any;

export class CompileNodeSwaggerRepresentation extends CompileNode {
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

  protected HandleTypeArray(node: IUniNodeTypeArray, context?: any): ICompiledNodeSwaggerRepresentation {
    const nested = this.Handle(node.items, context);

    return {
      ...nested,
      isArray: true,
    };
  }

  protected HandleTypeReference(node: IUniNodeType, context?: any) {
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
          context,
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
          context,
        );
      } else {
        return this.Handle(dereferenced, context);
      }
    }

    return this.OnUnhandled(node, context);
  }

  protected HandleView(node: IUniNodeView, context?: Record<string, any>): ICompiledNodeSwaggerRepresentation {
    const ctor = this.classCompiler.CompileCtor(node, null, context);

    return {
      type: () => ctor,
    };
  }

  Handle(node: IUniNode, ctx?: any): ICompiledNodeSwaggerRepresentation | null {
    return <ICompiledNodeSwaggerRepresentation | null>super.Handle(node, ctx);
  }
}
