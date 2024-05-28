import type { IUniNode } from "../Node";
import type { IUniNodeTypeBase } from "./-Base";
import { UniNodeTypeBase } from "./-Base";

// ===========================================================

export type IUniNodeTypeString = IUniNodeTypeBase & {
  type: "string";

  format?: "uuid" | "date" | "date-time" | "time" | "e-mail";

  constraints?: {
    minLength?: number | false;
    maxLength?: number | false;
    pattern?: string;
  } & Record<`x-${string}`, any>;
};

export const UniNodeTypeString = <Target extends IUniNodeTypeString, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return UniNodeTypeBase({
    type: "string",
    ...options,
  }) as Output;
};

// ===========================================================

export type IUniNodeTypeInteger = IUniNodeTypeBase & {
  type: "integer";
  constraints?: {
    min?: number;
    max?: number;
    integer?: boolean;
    positive?: boolean;
  };
};

export const UniNodeTypeInteger = <Target extends IUniNodeTypeInteger, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return UniNodeTypeBase({
    type: "integer",
    ...options,
  }) as Output;
};

// ===========================================================

export type IUniNodeTypeReference = IUniNodeTypeBase & {
  type: "reference";
  targetsTo: string;
};

export const UniNodeTypeReference = <Target extends IUniNodeTypeReference, Options extends Partial<IUniNodeTypeReference>, Output extends Target & Options>(options?: Options) => {
  return UniNodeTypeBase({
    type: "reference",
    targetsTo: "unknown",
    ...options,
  }) as Output;
};

export const UniNodeTypeReferenceExtends = (ref: any, extension: Partial<IUniNodeTypeReference>) => {
  return UniNodeTypeReference({
    ...ref,
    ...extension,
  });
};

// ===========================================================

export type IUniNodeTypeObject = IUniNodeTypeBase & {
  type: "object";
  partialOf: string | null;
  properties: Record<string, IUniNodeType>;
};

export const UniNodeTypeObject = <Target extends IUniNodeTypeObject, Options extends Partial<IUniNodeTypeObject>, Output extends Target & Options>(options?: Options) => {
  return UniNodeTypeBase({
    type: "object",
    partialOf: null,
    properties: {},
    ...options,
  }) as Output;
};

// ===========================================================

export type IUniNodeTypeArray = IUniNodeTypeBase & {
  type: "array";
  items: IUniNodeType;
};

export const UniNodeTypeArray = <Target extends IUniNodeTypeArray, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return UniNodeTypeBase({
    type: "array",
    items: {},
    ...options,
  }) as Output;
};

export const UniNodeTypeArrayExtends = (ref: any, extension: Partial<Omit<IUniNodeTypeArray, "items">> & { items: Partial<IUniNodeTypeArray["items"]> }) => {
  return UniNodeTypeArray({
    ...ref,
    ...extension,
    items: {
      ...ref?.items,
      ...extension?.items,
    },
  });
};

// ===========================================================

export type IUniNodeTypeBoolean = IUniNodeTypeBase & {
  type: "boolean";
};

export const UniNodeTypeBoolean = <Target extends IUniNodeTypeBoolean, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return UniNodeTypeBase({
    type: "boolean",
    ...options,
  }) as Output;
};

// ===========================================================

export type IUniNodeTypeFile = IUniNodeTypeBase & {
  type: "file";
  mimeTypes: string[];
};

export const UniNodeTypeFile = <Target extends IUniNodeTypeFile, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return UniNodeTypeBase({
    type: "file",
    mimeTypes: [],
    ...options,
  }) as Output;
};

// ===========================================================

export type IUniNodeType = IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeReference | IUniNodeTypeObject | IUniNodeTypeArray | IUniNodeTypeBoolean | IUniNodeTypeFile;

export const IsUniNodeType = (node: IUniNode | any): node is IUniNodeType => node.kind === "type";

// ===========================================================
