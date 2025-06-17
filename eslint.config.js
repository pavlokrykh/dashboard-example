// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettier = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettierConfig,
    ],
    processor: angular.processInlineTemplates,
    plugins: { prettier: prettier },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      // Enforce Angular naming conventions
      "@angular-eslint/component-class-suffix": [
        "error",
        {
          suffixes: ["Component"],
        },
      ],
      "@angular-eslint/directive-class-suffix": [
        "error",
        {
          suffixes: ["Directive"],
        },
      ],
      "@angular-eslint/no-input-rename": "off",
      "prettier/prettier": ["error", {
        "trailingComma": "all",
        "singleQuote": true,
        "printWidth": 120,
        "tabWidth": 2
      }],
      "max-len": ["error", { code: 120 }],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          "patterns": [
            {
              "group": ["../**"],
              "message": "Relative imports are not allowed. Use path aliases instead."
            }
          ]
        }
      ],
      "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);