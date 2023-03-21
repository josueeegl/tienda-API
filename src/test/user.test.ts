import { Urls } from '../utils/protocols/protocols-http';


describe("users", () => {
  describe("get", () => {
    it("should return users", async () => {
      const urlParsed = Urls.parseUrl("http://localhost:3000/user/");
      expect(urlParsed.hostname).toEqual("localhost");
    });
  });
});
