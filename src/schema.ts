import { gql } from "apollo-server-express";

export default gql`
  type PageInfo {
    hasNextPage: Boolean!
  }
  type Article {
    id: ID!
    author: Author
    body: String
    createdAt: String!
    imageUrlString: String
    league: League
    team: Team
    title: String!
    updatedAt: String
  }

  type PageArticle {
    article: [Article!]
    pageInfo: PageInfo!
  }

  type Author {
    id: ID!
    createdAt: String!
    imageUrlString: String
    name: String!
    shortname: String!
    title: String
    updatedAt: String
  }

  type League {
    id: ID!
    createdAt: String!
    deletedAt: String
    name: String!
    shortName: String!
    sportType: String!
    title: String!
    updatedAt: String
  }

  type Query {
    article(id: ID!): Article
    articles: [Article]
    leagues: [League!]!
    teams: [Team!]!
    teamArticles(id: ID!): [Article]
    leagueArticles(id: ID!): [Article]
    pageArticles(offset: Int, limit: Int, teamIds: [String!], leagueIds: [String!]): PageArticle
  }

  type Team {
    id: ID!
    createdAt: String!
    deletedAt: String
    league: League!
    name: String!
    shortname: String!
    updatedAt: String
  }
`;
