"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protocols_http_1 = require("../utils/protocols/protocols-http");
describe("users", () => {
    describe("get", () => {
        it("should return users", async () => {
            const urlParsed = protocols_http_1.Urls.parseUrl("http://localhost:3000/user/");
            expect(urlParsed.hostname).toEqual("localhost");
        });
    });
});
