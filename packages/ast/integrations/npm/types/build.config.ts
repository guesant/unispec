import * as fs from "fs/promises";
import * as path from "path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig([
  {
    entries: [
      {
        builder: "copy",
        input: "../../../../../",
        pattern: "{LICENSE,README.md,CHANGELOG.md}",
        outDir: ".",
      },
      {
        builder: "mkdist",
        input: "./src/",
        outDir: "./dist/",
        declaration: true,
      },
    ],
    hooks: {
      async "build:done"(ctx) {
        for (const entry of ctx.buildEntries) {
          if (entry.chunk) {
            const entryDistPath = path.join("dist", entry.path);

            if (entryDistPath.match(/\.mjs$/)) {
              await fs.unlink(entryDistPath);
            }
          }
        }
      },
    },
  },
]);
