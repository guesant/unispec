import type { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { CompileNode } from "@unispec/compiler";
import type { IUniNode, IUniNodeTypeArray, IUniNodeTypeString } from "@unispec/core";

export type ICompiledNodeSwaggerType =
  | SchemaObject
  | {
      // eslint-disable @typescript-eslint/ban-types
      type?: any | [any] | string;
      isArray?: boolean;
    };

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

  HandleTypeArray(node: IUniNodeTypeArray): ICompiledNodeSwaggerType {
    const nested = this.Handle(node.items);

    return {
      ...nested,
      isArray: true,
    };
  }

  Handle(node: IUniNode): ICompiledNodeSwaggerType | null {
    return <ICompiledNodeSwaggerType | null>super.Handle(node);
  }
}
