import type { IUniNodeBase } from "@unispec/ast-types";
import type { PartialDeep } from "type-fest";
import type { ISchema } from "yup";

export const SimpleBuilder = <T extends IUniNodeBase, S extends ISchema<any, any, any, any> = ISchema<any, any, any, any>>(schema: S) => {
  return (data?: PartialDeep<T>): T => {
    return <T>schema.validateSync(data);
  };
};

export const SimpleCheck = <T extends IUniNodeBase, S extends ISchema<any, any, any, any> = ISchema<any, any, any, any>>(schema: S) => {
  return (data?: any): data is T => {
    return schema.isValidSync(data, { strict: true });
  };
};
