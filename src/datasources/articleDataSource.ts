import { RESTDataSource } from "apollo-datasource-rest";
import { fetch } from "apollo-server-env";

export class ArticleDataSource extends RESTDataSource {
  constructor(httpFetch = fetch) {
    super(httpFetch);
    this.baseURL = "https://interview-backend.theathletic.com/";
  }

  async getArticle(id: string) {
    return this.get(`articles/${id}`);
  }

  async getArticles() {
    return this.get("articles");
  }

  async getTeamArticles(id: string) {
    return this.get(`teams/${id}/articles`);
  }
}
