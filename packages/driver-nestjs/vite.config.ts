/// <reference types='vitest' />
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/packages/driver-nestjs",

  plugins: [
    nxViteTsPaths(),
    dts({ entryRoot: "src", tsconfigPath: path.join(__dirname, "tsconfig.lib.json") }),
    externalizeDeps({
      useFile: path.join(__dirname, "package.json"),
    }),
    viteStaticCopy({
      targets: [
        {
          src: "../../README.md",
          dest: ".",
        },
      ],
    }),
  ],

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: "../../dist/packages/driver-nestjs",
    emptyOutDir: true,
    minify: false,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "driver-nestjs",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ["es", "cjs"],
    },
    rollupOptions: {},
  },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest/packages/driver-nestjs",
    },
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/packages/driver-nestjs",
      provider: "v8",
    },
  },
});
