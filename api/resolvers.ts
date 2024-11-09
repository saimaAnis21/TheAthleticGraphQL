// TODO check the Resolvers type and fix the errors before removing ts-nocheck.
// FYI the Resolvers type is auto-generated using `yarn generate`, config can be found in codegen.ts
//
// @ts-nocheck

import { Resolvers } from "schema-types";
import { slice, forEach, includes } from "lodash"
import { addFollowed } from "./helper";

const addFollowed = async (input, dataSources, partitionKey) => {
  const apiCalls = input.map(({ id, name }) =>
    dataSources.keyValueDatabase.put({
      partitionKey,
      sortKey: id,
      item: { id, name },
    })
  );
  const apiResponse = await Promise.allSettled(apiCalls);
  const response: any[] = [];
  apiResponse.forEach((i) => {
    if (i.status === "fulfilled") {
      response.push(i.value);
    }
  });
  const success = !!response;
  return { success: true };
};
const resolvers: Resolvers = {
  Article: {
    async author(source, _fields, { dataSources }) {
      return dataSources.authorDataSource.getAuthor(source.author.id);
    },
    async league(source, _fields, { dataSources }) {
      return dataSources.leagueDataSource.getLeague(source.league.id);
    },
    async team(source, _fields, { dataSources }) {
      return dataSources.teamDataSource.getTeam(source.team.id);
    },
  },
  Query: {
    async articles(_root, _, { dataSources }) {
      const articles = await dataSources.articleDataSource.getArticles();
      articles.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      return articles;
    },
    async pageArticles(_root, { offset, limit, teamIds, leagueIds }, { dataSources }) {
      if (offset < 0) throw new Error("offset must be positive");

      const articles = await dataSources.articleDataSource.getArticles();
      const selectedArticles = [];
      if (teamIds.length < 0 && leagueIds.length < 0) {
        selectedArticles = [...articles];
      }
      forEach(articles, (item) => {
        if (includes(teamIds, item.team.id) || includes(leagueIds, item.league.id)) {
          selectedArticles.push(item);
        }
      });
      selectedArticles.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      const pageArticles = slice(selectedArticles, offset, offset + limit);
      const hasNextPage = slice(selectedArticles, offset + limit, articles.length - 1).length > 0;
      return { article: pageArticles, pageInfo: { hasNextPage } };
    },
    async article(_root, { id }, { dataSources }) {
      return dataSources.articleDataSource.getArticle(id);
    },
    async leagues(_root, _args, { dataSources }) {
      const leagues = await dataSources.leagueDataSource.getLeagues();
      leagues.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
      return leagues;
    },
    async teams(_root, _args, { dataSources }) {
      return dataSources.teamDataSource.getTeams();
    },
    async teamArticles(_root, { id }, { dataSources }) {
      const articles = await dataSources.articleDataSource.getTeamArticles(id);
      return articles;
    },
    async leagueArticles(_root, { id }, { dataSources }) {
      const articles = await dataSources.articleDataSource.getLeagueArticles(id);
      return articles;
    },
    async followedTeams(_root, _args, { dataSources }) {
      const res = await dataSources.keyValueDatabase.query({ partitionKey: "followedTeams" });
      return res
    },
    async followedLeagues(_root, _args, { dataSources }) {
      return await dataSources.keyValueDatabase.query({ partitionKey: "followedLeagues" });
    },
  },
  Mutation: {
    async addFollowedTeams(_, { input }, { dataSources }) {
      await dataSources.keyValueDatabase.delete({
        partitionKey: "followedTeams",
      });
      const partitionKey= "followedTeams";
      return addFollowed(input, dataSources, partitionKey);
    },
    async addFollowedLeagues(_, { input }, { dataSources }) {
      await dataSources.keyValueDatabase.delete({
        partitionKey: "followedLeagues",
      });
       const partitionKey = "followedLeagues";
       return addFollowed(input, dataSources, partitionKey);
    },
  },
  Team: {
    async league(source, _fields, { dataSources }) {
      return dataSources.leagueDataSource.getLeague(source.league.id);
    },
  },
};

export default resolvers;
