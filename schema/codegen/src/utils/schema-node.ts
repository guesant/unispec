import $RefParser from "@apidevtools/json-schema-ref-parser";
import jetpack from "fs-jetpack";
import { paths } from "./paths";

export const getSchemaNode = async () => {
  const schemaPath = paths.schema.json.src.fileEntrypoint;

  const schemaContent = jetpack.exists(schemaPath) && jetpack.read(schemaPath, "json");

  if (schemaContent) {
    const cwd = process.cwd();

    process.chdir(paths.schema.json.src.dir);
    const schemaDereferenced = await $RefParser.dereference(schemaContent, { mutateInputSchema: false });

    process.chdir(cwd);

    return schemaDereferenced;
  } else {
    throw new Error(`Invalid file ${schemaPath}.`);
  }
};

export const getSchemaNodeJSON = async () => {
  const dereferenced = await getSchemaNode();

  return JSON.stringify(dereferenced);
};
