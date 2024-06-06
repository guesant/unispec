import { CheckType, CheckView } from "@unispec/ast-builder";
import {
  type IUniNode,
  type IUniNodeTypeArray,
  type IUniNodeTypeBoolean,
  type IUniNodeTypeInteger,
  type IUniNodeTypeObject,
  type IUniNodeTypeReference,
  type IUniNodeTypeString,
  type IUniNodeView,
} from "@unispec/ast-types";
import type { JSONSchema7 } from "json-schema";
import { NodeVisitor } from "../../visitor";
import { CreateResolveTokenName, type IResolveTokenName } from "../resolve-token-name";

export class JsonSchemaCompiler extends NodeVisitor {
  constructor(public resolveTokenName: IResolveTokenName = CreateResolveTokenName()) {
    super();
  }

  protected HandleJsonSchemaNode(node: IUniNode, type: JSONSchema7): JSONSchema7 {
    let jsonSchemaType = type;

    if (CheckView(node)) {
      jsonSchemaType = {
        description: node.description,
        ...type,
      };
    } else if (CheckType(node)) {
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

  override HandleTypeBoolean(node: IUniNodeTypeBoolean): JSONSchema7 {
    return this.HandleJsonSchemaNode(node, { type: "boolean" });
  }

  override HandleTypeArray(node: IUniNodeTypeArray): JSONSchema7 {
    return this.HandleJsonSchemaNode(node, { type: "array", items: this.Handle(node.items) });
  }

  override HandleTypeReference(node: IUniNodeTypeReference): JSONSchema7 {
    const token = this.resolveTokenName(node);

    let pointer = "";

    if (node.objectProperty) {
      pointer = `#/properties/${node.objectProperty}`;
    }

    return this.HandleJsonSchemaNode(node, { $ref: `${token}${pointer}` });
  }

  override HandleTypeInteger(node: IUniNodeTypeInteger): JSONSchema7 {
    return this.HandleJsonSchemaNode(node, { type: "integer" });
  }

  override HandleTypeObject(node: IUniNodeTypeObject): JSONSchema7 {
    const jsonSchemaType: JSONSchema7 = {
      type: "object",
      required: [],
      properties: {},
      additionalProperties: false,
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

  override HandleTypeString(node: IUniNodeTypeString): JSONSchema7 {
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

  override HandleView(node: IUniNodeView): JSONSchema7 {
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

  override Handle(node: IUniNode, ctx?: undefined): JSONSchema7 {
    return super.Handle(node, ctx);
  }
}
