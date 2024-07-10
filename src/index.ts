import { ApolloServer } from "apollo-server";
import type { DataSource } from "apollo-datasource";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { ArticleDataSource } from "./datasources/articleDataSource";
import { AuthorDataSource } from "./datasources/authorDataSource";
import { LeagueDataSource } from "./datasources/leagueDataSource";
import { TeamDataSource } from "./datasources/teamDataSource";
import { KeyValueDatabase } from "./datasources/keyValueDatabase";

export type ApolloContext = {
  userId: string;
  dataSources: DataSource[];
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const jwt = req.get("Authorization");
    const { userId } = await verifyUser(jwt);

    return {
      userId,
    };
  },
  dataSources: () => {
    return {
      articleDataSource: new ArticleDataSource(),
      authorDataSource: new AuthorDataSource(),
      leagueDataSource: new LeagueDataSource(),
      teamDataSource: new TeamDataSource(),
      keyValueDatabase: new KeyValueDatabase(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

async function verifyUser(jwt: string): Promise<{ userId: string }> {
  // TODO implement user authentication
  return {
    userId: "132",
  };
}
