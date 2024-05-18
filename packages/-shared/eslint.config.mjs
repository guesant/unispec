import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const sharedEslintConfig = tseslint.config({
  files: ["{src,test}/**/*.ts"],

  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],

  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "no-empty": "off",
  },
});

export default sharedEslintConfig;
