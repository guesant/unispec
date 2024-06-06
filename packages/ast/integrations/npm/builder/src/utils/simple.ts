import type { IUniNodeBase } from "@unispec/ast-types";
import type { PartialDeep } from "type-fest";
import type { Schema } from "yup";

export const SimpleBuilder = <T extends IUniNodeBase, S extends Schema = Schema>(schema: S) => {
  return (data?: PartialDeep<T>): T => {
    return <T>schema.validateSync(data);
  };
};

export const SimpleCheck = <T extends IUniNodeBase, S extends Schema = Schema>(schema: S) => {
  return (data?: any): data is T => {
    return schema.isValidSync(data, { strict: true });
  };
};
