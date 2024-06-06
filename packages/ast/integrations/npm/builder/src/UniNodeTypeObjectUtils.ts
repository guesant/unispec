import { type IUniNodeTypeObject } from "@unispec/ast-types";
import { BuildTypeObject } from "./UniNodeTypeObject";

export type IUniNodeTypeObjectPickedProperties<Node extends IUniNodeTypeObject, Properties extends keyof Node["properties"]> = Omit<Node, "properties"> & {
  properties: Pick<Node["properties"], Properties>;
};

export const UniNodeTypeObjectPick = <ObjectNode extends IUniNodeTypeObject, Properties extends keyof ObjectNode["properties"] = keyof ObjectNode["properties"]>(
  obj: ObjectNode,
  propertiesToPick: Properties[] | Record<Properties, boolean>,
): IUniNodeTypeObjectPickedProperties<ObjectNode, Properties> => {
  const checkProperty = (property: Properties | string) => {
    const permissivePropertiesToPick = <string[] | Record<string, boolean>>propertiesToPick;

    if (Array.isArray(permissivePropertiesToPick)) {
      return permissivePropertiesToPick.findIndex((i) => i === property) !== -1;
    } else {
      if (typeof property === "string" && property in permissivePropertiesToPick && permissivePropertiesToPick[property]) {
        return true;
      }
    }

    return false;
  };

  const properties = Object.fromEntries(Object.entries(obj.properties).filter(([key]) => checkProperty(key)));

  return BuildTypeObject({ ...obj, properties }) as IUniNodeTypeObjectPickedProperties<ObjectNode, Properties>;
};

export type IUniNodeTypeObjectPartialProperties<Node extends IUniNodeTypeObject> = Omit<Node, "properties"> & {
  properties: {
    [P in keyof Node["properties"]]: Node["properties"][P] & { required: false };
  };
};

export const UniNodeTypeObjectPartial = <ObjectNode extends IUniNodeTypeObject>(node: ObjectNode): IUniNodeTypeObjectPartialProperties<ObjectNode> => {
  const properties = Object.fromEntries(
    Object.entries(node.properties).map(([key, value]) => [
      key,
      {
        ...value,
        required: false,
      },
    ]),
  );

  return BuildTypeObject({ ...node, properties }) as IUniNodeTypeObjectPartialProperties<ObjectNode>;
};

export const UniNodeTypeObjectMerge = (objects: IUniNodeTypeObject[]) => {
  const obj = BuildTypeObject();

  for (const object of objects) {
    const { properties, ...rest } = object;
    Object.assign(obj.properties, properties);
    Object.assign(obj, rest);
  }

  return obj;
};
