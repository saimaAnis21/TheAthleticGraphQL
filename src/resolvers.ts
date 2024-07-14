// TODO check the Resolvers type and fix the errors before removing ts-nocheck.
// FYI the Resolvers type is auto-generated using `yarn generate`, config can be found in codegen.ts
//
// @ts-nocheck

import { Resolvers } from "schema-types";

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
  },
  Team: {
    async league(source, _fields, { dataSources }) {
      return dataSources.leagueDataSource.getLeague(source.league.id);
    },
  },
};

export default resolvers;
