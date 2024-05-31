import {
  IsUniNodeType,
  IsUniNodeView,
  type IUniNode,
  type IUniNodeTypeArray,
  type IUniNodeTypeBoolean,
  type IUniNodeTypeInteger,
  type IUniNodeTypeObject,
  type IUniNodeTypeReference,
  type IUniNodeTypeString,
  type IUniNodeView,
} from "@unispec/core";
import type { JSONSchema7 } from "json-schema";
import { NodeVisitor } from "../../Visitors";
import { CreateResolveTokenName, type IResolveTokenName } from "../ResolveTokenName";

export class JsonSchemaCompiler extends NodeVisitor {
  constructor(public resolveTokenName: IResolveTokenName = CreateResolveTokenName()) {
    super();
  }

  OnUnhandled() {
    return null;
  }

  private HandleJsonSchemaNode(node: IUniNode, type: JSONSchema7): JSONSchema7 {
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

  HandleTypeBoolean(node: IUniNodeTypeBoolean): JSONSchema7 {
    return this.HandleJsonSchemaNode(node, { type: "boolean" });
  }

  HandleTypeArray(node: IUniNodeTypeArray): JSONSchema7 {
    return this.HandleJsonSchemaNode(node, { type: "array", items: this.Handle(node.items) });
  }

  HandleTypeReference(node: IUniNodeTypeReference): JSONSchema7 {
    const token = this.resolveTokenName(node);

    return this.HandleJsonSchemaNode(node, { $ref: token });
  }

  HandleTypeInteger(node: IUniNodeTypeInteger): JSONSchema7 {
    return this.HandleJsonSchemaNode(node, { type: "integer" });
  }

  HandleTypeObject(node: IUniNodeTypeObject): JSONSchema7 {
    const jsonSchemaType: JSONSchema7 = {
      type: "object",
      required: [],
      properties: {},
    };

    jsonSchemaType.required ??= [];
    jsonSchemaType.properties ??= {};

    for (const [propertyKey, propertyNode] of Object.entries(node.properties)) {
      jsonSchemaType.properties[propertyKey] = this.Handle(propertyNode);

      if (propertyNode.required) {
        jsonSchemaType.required.push(propertyKey);
      }
    }

    return jsonSchemaType;
  }

  HandleTypeString(node: IUniNodeTypeString): JSONSchema7 {
    const jsonSchemaType: JSONSchema7 = {
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

  HandleView(node: IUniNodeView): JSONSchema7 {
    const nodeMeta = {
      description: node.description,
    };

    const token = this.resolveTokenName(node);

    return this.HandleJsonSchemaNode(node, {
      $id: token,
      ...this.Handle(node.type),
      ...nodeMeta,
    });
  }

  Handle(node: IUniNode, ctx?: undefined): JSONSchema7 {
    return super.Handle(node, ctx);
  }
}
