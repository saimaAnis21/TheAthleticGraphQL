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

  async getTeamIdsArticles(teamsIds: string[]) {
    const apiCalls = teamsIds.map((id) => this.getTeamArticles(id));
    const apiResponse = await Promise.allSettled(apiCalls);

    const response: any[] = [];
    apiResponse.forEach((i) => {
      if (i.status === "fulfilled") {
        response.push(...i.value);
      }
    });

    return response;
  }

  async getLeagueArticles(id: string) {
    return this.get(`leagues/${id}/articles`);
  }

  async getLeagueIdsArticles(leaguesIds: string[]) {
    const apiCalls = leaguesIds.map((id) => this.getLeagueArticles(id));
    const apiResponse = await Promise.allSettled(apiCalls);

    const response: any[] = [];
    apiResponse.forEach((i) => {
      if (i.status === "fulfilled") {
        response.push(...i.value);
      }
    });

    return response;
  }
}
