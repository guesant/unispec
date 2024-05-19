import { IView } from "../View/NodeView";
import { IType, ITypeObject, TypeInteger, TypeObject, TypeString } from "./NodeType";

type TypeEntityOptions = Partial<ITypeObject> & {
  id?: "numeric" | "uuid" | false;
  dated?: boolean;
};

export const TypeEntity = <K extends Partial<TypeEntityOptions> = Partial<TypeEntityOptions>>(k: K): ITypeObject => {
  const properties: Record<string, IType> = {};

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
        properties.id = TypeInteger({ description });
      } else if (id === "uuid") {
        properties.id = TypeString({ description, format: "uuid" });
      }
    }

    if (dated) {
      properties.dateCreated = TypeString({ description: "Data de Criação do Registro.", format: "date-time" });
      properties.dateUpdated = TypeString({ description: "Data de Atualização do Registro.", format: "date-time" });
      properties.dateDeleted = TypeString({ description: "Data de Exclusão do Registro.", format: "date-time", nullable: true });
    }
  }

  return TypeObject({
    type: "object",
    ...k,
    properties,
  });
};

export const TypePick = <Obj extends ITypeObject | IView, Properties extends keyof Obj["properties"] = keyof Obj["properties"]>(
  obj: Obj,
  propertiesToPick: Properties[] | Record<Properties, boolean>,
): ITypeObject["properties"] => {
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

export const TypePartial = <Obj extends ITypeObject | IView>(obj: Obj): ITypeObject["properties"] => {
  const properties = Object.fromEntries(Object.entries(obj.properties).map(([key, value]) => [key, { ...value, required: false }]));

  return properties;
};

export const TypeMerge = (objects: ITypeObject[]): ITypeObject => {
  const obj = TypeObject();

  for (const object of objects) {
    const { properties, ...rest } = object;
    Object.assign(obj.properties, properties);
    Object.assign(obj, rest);
  }

  return obj;
};
