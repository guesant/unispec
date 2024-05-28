import {
  IsUniNodeType,
  IsUniNodeView,
  type IUniNode,
  type IUniNodeTypeArray,
  type IUniNodeTypeBoolean,
  type IUniNodeTypeInteger,
  type IUniNodeTypeObject,
  type IUniNodeTypeString,
  type IUniNodeView,
} from "@unispec/core";
import { CompileNode } from "../../Compilers";

export class JsonSchemaCompiler extends CompileNode {
  private HandleJsonSchemaNode(node: IUniNode, type: any) {
    let jsonSchemaType = type;

    if (IsUniNodeView(node)) {
      jsonSchemaType = {
        description: node.description,
        ...type,
      };
    } else if (IsUniNodeType(node)) {
      jsonSchemaType = {
        description: node.description,
        ...type,
      };

      if (node.nullable) {
        jsonSchemaType = {
          oneOf: [jsonSchemaType, { type: "null" }],
        };
      }

      return jsonSchemaType;
    }

    return jsonSchemaType;
  }

  HandleTypeBoolean(node: IUniNodeTypeBoolean): unknown {
    return this.HandleJsonSchemaNode(node, {
      type: "boolean",
    });
  }

  HandleTypeArray(node: IUniNodeTypeArray) {
    return this.HandleJsonSchemaNode(node, {
      type: "array",
      items: this.Handle(node),
    });
  }

  HandleTypeInteger(node: IUniNodeTypeInteger) {
    return this.HandleJsonSchemaNode(node, {
      type: "integer",
    });
  }

  HandleTypeObject(node: IUniNodeTypeObject) {
    const jsonSchemaType = {
      type: "object",
      required: [] as string[],
      properties: {} as Record<string, any>,
    };

    for (const [propertyKey, propertyNode] of Object.entries(node.properties)) {
      jsonSchemaType.properties[propertyKey] = this.Handle(propertyNode);

      if (propertyNode.required) {
        jsonSchemaType.required.push(propertyKey);
      }
    }

    return jsonSchemaType;
  }

  HandleTypeString(node: IUniNodeTypeString) {
    const jsonSchemaType: any = {
      type: "string",
    };

    switch (node.format) {
      case "date-time":
      case "uuid":
      case "e-mail":
      case "time":
      case "date": {
        jsonSchemaType.format = node.format;
        break;
      }

      default: {
        break;
      }
    }

    return this.HandleJsonSchemaNode(node, jsonSchemaType);
  }

  HandleView(node: IUniNodeView) {
    // return this.HandleJsonSchemaNode(node, this.Handle(node.type));

    throw new Error("Waiting for the next release of @unispec/core");
  }
}
