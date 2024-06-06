import { writeFileSync } from "node:fs";
import { schema2typebox } from "schema2typebox";
import { paths } from "../../utils/paths";
import { getSchemaNodeJSON } from "../../utils/schema-node";
import { AbstractGen } from "../abstract-gen";

export class GenNpmTypebox extends AbstractGen {
  async generate() {
    console.log("[gen::npm::typebox]: generate() called");

    const generatedFilePath = paths.schema.integrations.npm.typebox.src.generated.file;

    const schemaJSON = await getSchemaNodeJSON();
    const result = await schema2typebox({ input: schemaJSON });
    writeFileSync(generatedFilePath, result);

    console.log("[gen::npm::typebox]: done");
  }
}
