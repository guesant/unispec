import { Base } from "../Base";
import { IToken } from "../Token";

// ===========================================================

export type IBaseNodeType = {
  kind: "type";
  type: string;
  nullable: boolean;
  required: boolean;
  description: string;
  default?: any;
};

export const BaseNodeType = <Target extends IBaseNodeType, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return Base({
    kind: "type",
    type: "unknown",
    nullable: false,
    required: true,
    description: "",
    default: undefined,
    ...options,
  }) as Output;
};

// ===========================================================

export type ITypeString = IBaseNodeType & {
  type: "string";

  format?: "uuid" | "date" | "date-time" | "time" | "e-mail";

  constraints?: {
    minLength?: number | false;
    maxLength?: number | false;
    pattern?: string;
  } & Record<`x-${string}`, any>;
};

export const TypeString = <Target extends ITypeString, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return BaseNodeType({
    type: "string",
    ...options,
  }) as Output;
};

// ===========================================================

export type ITypeInteger = IBaseNodeType & {
  type: "integer";
  constraints?: {
    min?: number;
    max?: number;
    integer?: boolean;
    positive?: boolean;
  };
};

export const TypeInteger = <Target extends ITypeInteger, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return BaseNodeType({
    type: "integer",
    ...options,
  }) as Output;
};

// ===========================================================

export type ITypeReference = IBaseNodeType & {
  type: "reference";
  targetsTo: string;
};

export const TypeReference = <Target extends ITypeReference, Options extends Partial<ITypeReference>, Output extends Target & Options>(options?: Options) => {
  return BaseNodeType({
    type: "reference",
    targetsTo: "unknown",
    ...options,
  }) as Output;
};

export const TypeReferenceExtends = (ref: any, extension: Partial<ITypeReference>) => {
  return TypeReference({
    ...ref,
    ...extension,
  });
};

// ===========================================================

export type ITypeObject = IBaseNodeType & {
  type: "object";
  properties: Record<string, IType>;
};

export const TypeObject = <Target extends ITypeObject, Options extends Partial<ITypeObject>, Output extends Target & Options>(options?: Options) => {
  return BaseNodeType({
    type: "object",
    properties: {},
    ...options,
  }) as Output;
};

// ===========================================================

export type ITypeArray = IBaseNodeType & {
  type: "array";
  items: IType;
};

export const TypeArray = <Target extends ITypeArray, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return BaseNodeType({
    type: "array",
    items: {},
    ...options,
  }) as Output;
};

export const UniTypeArrayExtends = (ref: any, extension: Partial<Omit<ITypeArray, "items">> & { items: Partial<ITypeArray["items"]> }) => {
  return TypeArray({
    ...ref,
    ...extension,
    items: {
      ...ref?.items,
      ...extension?.items,
    },
  });
};

// ===========================================================

export type ITypeBoolean = IBaseNodeType & {
  type: "boolean";
};

export const TypeBoolean = <Target extends ITypeBoolean, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return BaseNodeType({
    type: "boolean",
    ...options,
  }) as Output;
};

// ===========================================================

export type ITypeFile = IBaseNodeType & {
  type: "file";
  mimeTypes: string[];
};

export const TypeFile = <Target extends ITypeFile, Options extends Partial<Target>, Output extends Target & Options>(options?: Options) => {
  return BaseNodeType({
    type: "file",
    mimeTypes: [],
    ...options,
  }) as Output;
};

// ===========================================================

export type IType = ITypeString | ITypeInteger | ITypeReference | ITypeObject | ITypeArray | ITypeBoolean | ITypeFile;

export const IsNodeType = (node: IToken): node is IType => {
  return node.kind === "type";
};
