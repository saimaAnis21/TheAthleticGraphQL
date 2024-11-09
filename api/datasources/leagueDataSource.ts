import { RESTDataSource } from "apollo-datasource-rest";

export class LeagueDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://interview-backend.theathletic.com/";
  }

  async getLeague(id: string) {
    return this.get(`leagues/${id}`);
  }

  async getLeagues() {
    return this.get("leagues");
  }
}
