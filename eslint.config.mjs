import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const sharedEslintConfig = tseslint.config({
  files: ["{packages}/{src,test}/**/*.ts"],

  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],

  rules: {
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "separate-type-imports" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "no-empty": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
});

export default sharedEslintConfig;
