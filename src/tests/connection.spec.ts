import request from "supertest";
import Server from "../infrastructure/driving-adapters/api/Server";

describe("TEST CONNECTION to localhost:3000 ", () => {
  test("should return status code 404", async () => {
    const response = await request(new Server().app).get("/");
    expect(response.statusCode).toBe(404);
    expect(response.text).toEqual("invalid request, check url");
  });
});
