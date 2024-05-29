/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { viteStaticCopy } from "vite-plugin-static-copy";

/**
 *
 * @param {import("./vite.config").ViteCommonConfigOptions} options
 * @returns {import("vite").UserConfig}
 */
export const getViteCommonConfig = (options) => {
  console.log({ options });
  return defineConfig({
    root: options.root,
    cacheDir: `${options.workspace}/node_modules/.vite/packages/${options.pkg}`,

    plugins: [
      nxViteTsPaths(),
      dts({
        outDir: `${options.output}/dist`,
        entryRoot: `${options.source}`,
        tsconfigPath: path.join(options.root, "tsconfig.lib.json"),
      }),
      externalizeDeps({
        useFile: path.join(options.root, "package.json"),
      }),
      viteStaticCopy({
        targets: [
          {
            src: `${options.workspace}/README.md`,
            dest: `.`,
          },
          {
            src: `${options.workspace}/LICENSE*`,
            dest: `.`,
          },
        ],
      }),
    ],

    build: {
      outDir: `${options.output}`,

      emptyOutDir: true,
      minify: false,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      lib: {
        name: `${options.pkg}`,
        entry: `${options.source}/index.ts`,
        fileName: (format) => {
          switch (format) {
            case "cjs": {
              return `dist/index.cjs.js`;
            }
            case "es":
            case "esm": {
              return `dist/index.esm.js`;
            }
            default: {
              return `dist/index.${format}.js`;
            }
          }
        },
        formats: ["es", "cjs"],
      },
    },

    test: {
      globals: true,
      environment: "node",
      include: [`${options.source}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`],

      reporters: ["default"],
      coverage: {
        reportsDirectory: `${options.workspace}/coverage/packages/${options.pkg}`,
        provider: "v8",
      },
    },
  });
};
