import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

export const paths = {
  get workspace() {
    return join(here, "../../../..");
  },

  schema: {
    get dir() {
      return join(paths.workspace, "schema");
    },

    json: {
      get dir() {
        return join(paths.schema.dir, "json");
      },

      src: {
        get dir() {
          return join(paths.schema.json.dir, "src");
        },

        get fileEntrypoint() {
          return join(paths.schema.json.src.dir, "node.json");
        },
      },
    },

    integrations: {
      get dir() {
        return join(paths.schema.dir, "integrations");
      },

      npm: {
        get dir() {
          return join(paths.schema.integrations.dir, "npm");
        },

        typebox: {
          get dir() {
            return join(paths.schema.integrations.npm.dir, "typebox");
          },

          src: {
            get dir() {
              return join(paths.schema.integrations.npm.typebox.dir, "src");
            },

            generated: {
              get dir() {
                return join(paths.schema.integrations.npm.typebox.src.dir, "generated");
              },

              get file() {
                return join(paths.schema.integrations.npm.typebox.src.generated.dir, "typebox.generated.ts");
              },
            },
          },
        },
      },
    },
  },
};
