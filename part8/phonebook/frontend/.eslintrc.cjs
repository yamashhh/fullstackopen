module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      excludedFiles: "src/generated/graphql.tsx",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        extends: [
          "plugin:@typescript-eslint/recommended-requiring-type-checking",
        ],
      },
      rules: {
        // NOTE:
        // https://github.com/typescript-eslint/typescript-eslint/issues/4619
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            // https://typescript-eslint.io/rules/no-misused-promises/#when-not-to-use-it
            checksVoidReturn: {
              variables: false,
            },
          },
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
};
