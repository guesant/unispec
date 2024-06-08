import type { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { CheckType, CheckView } from "@unispec/ast-builder";
import type { IUniNode, IUniNodeType, IUniNodeTypeArray, IUniNodeTypeString, IUniNodeView } from "@unispec/ast-types";
import { CompileNode } from "@unispec/ast-utils";

export type ICompiledNodeSwaggerType =
  | SchemaObject
  | {
      type?: any | [any] | string;
      isArray?: boolean;
    }
  | any;

export class CompileNodeSwaggerType extends CompileNode {
  HandleTypeString(node: IUniNodeTypeString): ICompiledNodeSwaggerType {
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

  HandleTypeInteger(): ICompiledNodeSwaggerType {
    return {
      type: "integer",
    };
  }

  HandleTypeBoolean(): ICompiledNodeSwaggerType {
    return {
      type: "boolean",
    };
  }

  HandleTypeArray(node: IUniNodeTypeArray, ctx?: any): ICompiledNodeSwaggerType {
    const nested = this.Handle(node.items, ctx);

    return {
      ...nested,
      isArray: true,
    };
  }

  HandleTypeReference(node: IUniNodeType, context?: any) {
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

    return this.OnUnhandled();
  }

  HandleView(node: IUniNodeView, meta?: Record<string, any>): ICompiledNodeSwaggerType {
    const ctor = this.classCompiler.CompileCtor(node, null, meta);

    return {
      type: () => ctor,
    };
  }

  Handle(node: IUniNode, ctx?: any): ICompiledNodeSwaggerType | null {
    return <ICompiledNodeSwaggerType | null>super.Handle(node, ctx);
  }
}
