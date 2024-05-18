import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["packages/*/{src,test}/**/*.ts"],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  languageOptions: {
    parserOptions: {
      project: ["./packages/*/tsconfig.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "no-empty": "off",
  },
});
