import { CheckType, CheckView } from "@unispec/ast-builder";
import {
  type IUniNode,
  type IUniNodeTypeArray,
  type IUniNodeTypeBoolean,
  type IUniNodeTypeFile,
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

  protected HandleJsonSchemaNode(node: IUniNode, type: JSONSchema7, _context?: any): JSONSchema7 {
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

  protected override HandleTypeFile(node: IUniNodeTypeFile, context?: undefined) {
    return this.HandleJsonSchemaNode(node, { type: "string", format: "binary" }, context);
  }

  override HandleTypeBoolean(node: IUniNodeTypeBoolean, context?: any): JSONSchema7 {
    return this.HandleJsonSchemaNode(node, { type: "boolean" }, context);
  }

  override HandleTypeArray(node: IUniNodeTypeArray, context?: any): JSONSchema7 {
    return this.HandleJsonSchemaNode(node, { type: "array", items: this.Handle(node.items) }, context);
  }

  override HandleTypeReference(node: IUniNodeTypeReference, context?: any): JSONSchema7 {
    const token = this.resolveTokenName(node);

    let pointer = "";

    if (node.objectProperty) {
      pointer = `#/properties/${node.objectProperty}`;
    }

    return this.HandleJsonSchemaNode(node, { $ref: `${token}${pointer}` }, context);
  }

  override HandleTypeInteger(node: IUniNodeTypeInteger, context?: any): JSONSchema7 {
    return this.HandleJsonSchemaNode(node, { type: "integer" }, context);
  }

  override HandleTypeObject(node: IUniNodeTypeObject, context?: any): JSONSchema7 {
    const jsonSchemaType: JSONSchema7 = {
      type: "object",
      required: [],
      properties: {},
      additionalProperties: false,
    };

    jsonSchemaType.required ??= [];
    jsonSchemaType.properties ??= {};

    for (const [propertyKey, propertyNode] of Object.entries(node.properties)) {
      jsonSchemaType.properties[propertyKey] = this.Handle(propertyNode, context);

      if (propertyNode.required) {
        jsonSchemaType.required.push(propertyKey);
      }
    }

    return jsonSchemaType;
  }

  override HandleTypeString(node: IUniNodeTypeString, context?: any): JSONSchema7 {
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

    return this.HandleJsonSchemaNode(node, jsonSchemaType, context);
  }

  override HandleView(node: IUniNodeView, context?: any): JSONSchema7 {
    const nodeMeta = {
      description: node.description,
    };

    const token = this.resolveTokenName(node);

    return this.HandleJsonSchemaNode(
      node,
      {
        $id: token,
        ...this.Handle(node.type),
        ...nodeMeta,
      },
      context,
    );
  }

  override Handle(node: IUniNode, context?: any): JSONSchema7 {
    return super.Handle(node, context);
  }
}
