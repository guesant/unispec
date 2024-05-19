import { IUniNodeType, IUniNodeTypeObject, UniNodeTypeInteger, UniNodeTypeObject, UniNodeTypeString } from "../Kinds/Type";
import { IUniNodeView } from "../Kinds/View";

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

export const UniNodeTypeObjectPick = <Obj extends IUniNodeTypeObject | IUniNodeView, Properties extends keyof Obj["properties"] = keyof Obj["properties"]>(
  obj: Obj,
  propertiesToPick: Properties[] | Record<Properties, boolean>,
): IUniNodeTypeObject["properties"] => {
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

  return properties;
};

export const UniNodeTypeObjectPartial = <Obj extends IUniNodeTypeObject | IUniNodeView>(obj: Obj): IUniNodeTypeObject["properties"] => {
  const properties = Object.fromEntries(Object.entries(obj.properties).map(([key, value]) => [key, { ...value, required: false }]));

  return properties;
};

export const UniNodeTypeObjectMerge = (objects: IUniNodeTypeObject[]): IUniNodeTypeObject => {
  const obj = UniNodeTypeObject();

  for (const object of objects) {
    const { properties, ...rest } = object;
    Object.assign(obj.properties, properties);
    Object.assign(obj, rest);
  }

  return obj;
};
