module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    "universe/native",
    "universe/shared/typescript-analysis",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "standard-with-typescript",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "import/order": ["warn", { "newlines-between": "ignore" }],
  },
  ignorePatterns: ["./src/gql/**"],
  overrides: [
    {
      files: ["*.js", "*.ts", "*.jsx", "*.tsx"],
      processor: "@graphql-eslint/graphql",
    },
    {
      files: ["*.graphql"],
      extends: "plugin:@graphql-eslint/operations-recommended",
      parserOptions: {
        operations: "./src/**/*.ts",
        schema: "http://localhost:4000",
      },
    },
  ],
};
