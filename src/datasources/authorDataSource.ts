import { RESTDataSource } from "apollo-datasource-rest";

export class AuthorDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://interview-backend.theathletic.com/";
  }

  async getAuthor(id: string) {
    return this.get(`authors/${id}`);
  }
}
