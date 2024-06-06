/// <reference types='vitest' />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [`./**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`],
    reporters: ["default"],
    coverage: {
      reportsDirectory: `../../coverage/packages/compiler`,
      provider: "v8",
    },
  },
});
