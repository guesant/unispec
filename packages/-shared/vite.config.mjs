/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import defu from "defu";
import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { viteStaticCopy } from "vite-plugin-static-copy";

/**
 * GetViteCommonConfig
 * @param {import("./vite.config").ViteCommonConfigOptions} options
 * @param {import("vite").UserConfig?} extraConfig
 * @returns {import("vite").UserConfig}
 */
export const getViteCommonConfig = (options, extraConfig) => {
  options.pkg ??= path.basename(options.root);

  options.source ??= `${options.root}/src`;
  options.workspace ??= path.join(options.root, `../..`);

  const pkgLocally = process.env.PKG_LOCALLY === "true";
  const pkgNoCopyAssets = process.env.PKG_NO_COPY_ASSETS === "true";
  const pkgNoClearOutput = process.env.PKG_NO_CLEAR_OUTPUT === "true";

  options.output ??= pkgLocally ? `${options.root}` : `${options.workspace}/dist/packages/${options.pkg}`;

  options.copyAssets ??= !pkgLocally && !pkgNoCopyAssets;
  options.clearOutputDir ??= !pkgLocally && !pkgNoClearOutput;

  return defineConfig(
    defu(
      {
        root: options.root,

        cacheDir: `${options.workspace}/node_modules/.vite/packages/${options.pkg}`,

        plugins: [
          nxViteTsPaths(),
          dts({
            outDir: options.output ? path.join(options.output, "dist") : "dist",
            entryRoot: `${options.source}`,
            tsconfigPath: path.join(options.root, "tsconfig.lib.json"),
          }),
          externalizeDeps({
            useFile: path.join(options.root, "package.json"),
          }),
          viteStaticCopy({
            targets: options.copyAssets
              ? [
                  {
                    src: `${options.workspace}/README.md`,
                    dest: `.`,
                  },
                  {
                    src: `${options.workspace}/LICENSE*`,
                    dest: `.`,
                  },
                ]
              : [],
          }),
        ],

        build: {
          outDir: options.output ? `${options.output}` : undefined,

          emptyOutDir: options.clearOutputDir,

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
      },
      extraConfig ?? {},
    ),
  );
};
