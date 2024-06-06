import type { IUniNodeBase } from "@unispec/ast-types";
import type { PartialDeep } from "type-fest";
import type { AnySchema, ISchema } from "yup";

export const SimpleBuilder = <T extends IUniNodeBase, S extends ISchema<any, any, any, any> = ISchema<any, any, any, any>>(schema: S) => {
  return (data?: PartialDeep<T>): T => {
    const casted = <AnySchema>(<any>schema);
    return <T>casted.validateSync(data);
  };
};

export const SimpleCheck = <T extends IUniNodeBase, S extends ISchema<any, any, any, any> = ISchema<any, any, any, any>>(schema: S) => {
  return (data?: any): data is T => {
    const casted = <AnySchema>(<any>schema);
    return casted.isValidSync(data, { strict: true });
  };
};
