import { UniNodeTypeInteger, UniNodeTypeObject, UniNodeTypeString, type IUniNodeType, type IUniNodeTypeObject } from "../Kinds";

export type IUniNodeTypeObjectEntityOptions = Partial<IUniNodeTypeObject> & {
  id?: "numeric" | "uuid" | false;
  dated?: boolean;
};

export const UniNodeTypeObjectEntity = <K extends Partial<IUniNodeTypeObjectEntityOptions> = Partial<IUniNodeTypeObjectEntityOptions>>(k: K): IUniNodeTypeObject => {
  const properties: Record<string, IUniNodeType> = {};

  if (k) {
    const {
      id,
      dated,
      properties: { ...rest },
    } = k;

    Object.assign(properties, rest);

    if (id) {
      const description = "ID do Registro.";

      if (id === "numeric") {
        properties.id = UniNodeTypeInteger({ description });
      } else if (id === "uuid") {
        properties.id = UniNodeTypeString({ description, format: "uuid" });
      }
    }

    if (dated) {
      properties.dateCreated = UniNodeTypeString({ description: "Data de Criação do Registro.", format: "date-time" });
      properties.dateUpdated = UniNodeTypeString({ description: "Data de Atualização do Registro.", format: "date-time" });
      properties.dateDeleted = UniNodeTypeString({ description: "Data de Exclusão do Registro.", format: "date-time", nullable: true });
    }
  }

  return UniNodeTypeObject({
    type: "object",
    ...k,
    properties,
  });
};

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

  return UniNodeTypeObject({ ...obj, properties }) as IUniNodeTypeObjectPickedProperties<ObjectNode, Properties>;
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

  return UniNodeTypeObject({ ...node, properties }) as IUniNodeTypeObjectPartialProperties<ObjectNode>;
};

export const UniNodeTypeObjectMerge = (objects: IUniNodeTypeObject[]) => {
  const obj = UniNodeTypeObject();

  for (const object of objects) {
    const { properties, ...rest } = object;
    Object.assign(obj.properties, properties);
    Object.assign(obj, rest);
  }

  return obj;
};
