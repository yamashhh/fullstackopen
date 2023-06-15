import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: ["src/**/*.ts?(x)"],
  generates: {
    "./src/generated/gql/": {
      preset: "client",
      plugins: [
        {
          add: {
            content: "// @ts-nocheck",
          },
        },
      ],
    },
  },
  hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
