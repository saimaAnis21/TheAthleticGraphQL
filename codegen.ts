import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["api/schema.ts"],
  generates: {
    "./api/schema-types.ts": {
      plugins: [
        "typescript",
        {
          "typescript-resolvers": {
            contextType: "index#ApolloContext",
          },
        },
      ],
    },
  },
};

export default config;
