import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { ArticleDataSource } from "../articleDataSource";

describe("ArticleDataSource", () => {
  let articleDataSource: ArticleDataSource;

  beforeEach(() => {
    articleDataSource = new ArticleDataSource();
    articleDataSource.initialize({
      context: {},
      cache: new InMemoryLRUCache(),
    });
  });

  describe("getArticle", () => {
    it("should fetch the correct URL and return the article", async () => {
      const articleId = "FF1F32E5-7D36-4AC7-B855-3BBD5907ADF6";

      const article = await articleDataSource.getArticle(articleId);
       
      // Why does this not work?!
      // FIXME: make this unit test function correctly and sustainably
      expect(article.body).toBeDefined();
    });
  });
});
