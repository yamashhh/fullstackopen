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
    "standard-with-typescript",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "import/order": ["warn", { "newlines-between": "ignore" }],
  },
};
