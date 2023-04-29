module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.ts", "*.mts", "*.cts"],
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  ],
  rules: {},
};
