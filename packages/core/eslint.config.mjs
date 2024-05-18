import tseslint from "typescript-eslint";
import sharedEslintConfig from "../-shared/eslint.config.mjs";

export default tseslint.config({
  extends: [...sharedEslintConfig],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
