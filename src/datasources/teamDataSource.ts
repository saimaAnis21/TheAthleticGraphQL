import { RESTDataSource } from "apollo-datasource-rest";

export class TeamDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://interview-backend.theathletic.com/";
  }

  async getTeam(id: string) {
    return this.get(`teams/${id}`);
  }

  async getTeams() {
    return this.get(`teams`);
  }
}
