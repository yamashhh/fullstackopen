module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'prettier'],
  overrides: [
    {
      files: ['*.js'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/known-type-names': 'error',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
