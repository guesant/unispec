import type { IUniNode } from "@unispec/core";
import { U } from "@unispec/core";

export type IBuildTypeOptions = {
  resolveTokenName: (node: IUniNode) => string;
};

export const BuildType = (options: IBuildTypeOptions) => (node: IUniNode) => {
  let primitiveType = "never";

  if (U.IsNodeType(node)) {
    switch (node.type) {
      case "boolean": {
        primitiveType = "boolean";
        break;
      }

      case "integer": {
        primitiveType = "number";
        break;
      }

      case "string": {
        primitiveType = "string";

        if (node.format === "date" || node.format == "date-time") {
          primitiveType += " | number | Date";
        }

        break;
      }

      case "object": {
        let base = "{\n";

        const properties = { ...node.properties };

        const propertiesEntries = Object.entries(properties).sort((a, b) => {
          const a_key = a[0];
          const b_key = b[0];

          if (a_key === "id") {
            return -1;
          }

          if (b_key === "id") {
            return 1;
          }

          const datesOrder = ["dateCreated", "dateUpdated", "dateDeleted"];

          if (datesOrder.includes(a_key) || datesOrder.includes(b_key)) {
            return datesOrder.indexOf(a_key) - datesOrder.indexOf(b_key);
          }

          return 0;
        });

        for (const [propertyKey, propertyDefinition] of propertiesEntries) {
          const propertyType = BuildType(options)(propertyDefinition);

          if (propertyType === "never") {
            continue;
          }
          let objPropertyDeclaration = "";

          if (propertyDefinition.description) {
            base += `  /** ${propertyDefinition.description} */\n`;
          }

          objPropertyDeclaration += `  ${propertyKey}: ${propertyType};\n`;

          base += objPropertyDeclaration;
        }

        base += "}";

        primitiveType = base;

        break;
      }

      case "array": {
        const propertyType = BuildType(options)(node.items);

        primitiveType = `Array<${propertyType}>`;
        break;
      }

      case "reference": {
        const referenceAlias = options.resolveTokenName(node);
        primitiveType = `${referenceAlias}`;
        break;
      }

      default: {
        break;
      }
    }

    if (primitiveType === "never") {
      return primitiveType;
    }

    if (node.nullable) {
      primitiveType = `${primitiveType} | null`;
    }

    if (!node.required) {
      primitiveType = `${primitiveType} | undefined`;
    }

    return primitiveType;
  }

  return primitiveType;
};
