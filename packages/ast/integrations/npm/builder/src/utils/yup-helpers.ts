import type { Schema } from "yup";
import * as yup from "yup";

const multipleCheck = (value: any, schemas: Schema[], options?: yup.ValidateOptions<any> | undefined) => {
  const checks: { schema: Schema }[] = [];

  for (const schema of schemas) {
    if (schema.isValidSync(value, { strict: true, ...options })) {
      checks.push({ schema });
    }
  }

  return checks;
};

const multipleTest = (value: any, schemas: Schema[], options?: yup.ValidateOptions<any> | undefined) => {
  return multipleCheck(value, schemas, { ...options }).length;
};

export const yupOneOf = <T extends {}>(schemas: () => Schema[]): yup.MixedSchema<T | undefined, yup.AnyObject, undefined, ""> => {
  return yup
    .mixed<T>()
    .transform((value) => {
      const checks = multipleCheck(value, schemas(), { strict: false });

      if (checks.length === 1) {
        return checks[0].schema.cast(value);
      }

      return value;
    })
    .test("one-of", (value) => {
      const count = multipleTest(value, schemas(), { strict: true });
      return count === 1;
    });
};

export const yupOneOfTwo = <T extends {}>(schemas: () => Schema[]): yup.MixedSchema<T | undefined, yup.AnyObject, undefined, ""> => {
  return yup.mixed<T>().test("one-of", (value) => {
    const count = multipleTest(value, schemas());
    return count === 1;
  });
};
