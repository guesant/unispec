import type { IUniNodeBase } from "@unispec/ast-types";
import type { AnySchema, ISchema } from "yup";

export const SimpleBuilder = <T extends IUniNodeBase, S extends ISchema<any, any, any, any> = ISchema<any, any, any, any>>(schema: S) => {
  return <Data extends Partial<T>, Result extends T & Data>(data?: Data): Result => {
    const casted = <AnySchema>(<any>schema);
    return <Result>casted.validateSync(data);
  };
};

export const SimpleCheck = <T extends IUniNodeBase, S extends ISchema<any, any, any, any> = ISchema<any, any, any, any>>(schema: S) => {
  return (data?: any): data is T => {
    const casted = <AnySchema>(<any>schema);
    return casted.isValidSync(data, { strict: true });
  };
};
