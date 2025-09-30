import globals from "globals";
import tsEslint from "typescript-eslint";
import eslint from "@eslint/js";
import sveltePlugin from "eslint-plugin-svelte";
import prettierConfig from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...sveltePlugin.configs["flat/recommended"],
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tsEslint.parser,
      },
    },
  },
  {
    ignores: ["build/", ".svelte-kit/", "dist/"],
  },
];
