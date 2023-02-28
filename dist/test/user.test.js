"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const chai_2 = require("chai");
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
const urlBase = "http://localhost:3000";
describe("Test Users API ", () => {
    describe("GET /user", () => {
        it("GET /user/login - verify user and get it", (done) => {
            chai_1.default
                .request(urlBase)
                .get("/user/login")
                .send({ username: "josuee", password: "123" })
                .end((err, res) => {
                (0, chai_2.expect)(res, "user not found").to.have.status(200);
                (0, chai_2.expect)(res.body, "should return a object").should.be.a("object");
                done();
            });
        });
        it("GET /user/login - Username and password must be received", (done) => {
            chai_1.default
                .request(urlBase)
                .get("/user/login")
                .send({ username: "josuee" })
                .end((err, res) => {
                (0, chai_2.expect)(res, "incomplete parameters").to.have.status(400);
                res.text.should.be.equal("missing password or username", "should return a text informative");
                done();
            });
        });
        it("GET /user all users", (done) => {
            chai_1.default
                .request(urlBase)
                .get("/user")
                .end((err, res) => {
                (0, chai_2.expect)(res, "should return a 200 status").to.have.status(200);
                (0, chai_2.expect)(res.body, "should return a object").should.be.a("object");
                done();
            });
        });
    });
    describe("Post /user", () => {
        it("POST /user - create new user that already exists", (done) => {
            chai_1.default
                .request(urlBase)
                .post("/user")
                .send({
                name: "josue garcia",
                username: "josueeegl",
                password: "123",
                carDealershipIdCarDealership: "1",
            })
                .end((err, res) => {
                (0, chai_2.expect)(res, "does not verify that the user already exists").to.have.status(400);
                (0, chai_2.expect)(res.body, "should return a object").should.be.a("object");
                done();
            });
        });
        it("POST /user - all fields must be received", (done) => {
            chai_1.default
                .request(urlBase)
                .post("/user")
                .send({ username: "josuee", password: "123" })
                .end((err, res) => {
                (0, chai_2.expect)(res, "incomplete parameters to create user").to.have.status(400);
                (0, chai_2.expect)(res.body, "should return a object").should.be.a("object");
                res.text.should.be.equal("missing fields", "should return a text informative");
                done();
            });
        });
    });
    describe("PUT /user", () => {
        it("PUT /user - update user with id", (done) => {
            chai_1.default
                .request(urlBase)
                .put("/user/4")
                .send({ name: "josue garcia" })
                .end((err, res) => {
                (0, chai_2.expect)(res, "does verify that the user already exists").to.have.status(201);
                res.text.should.be.eq("user updated successfully", "should return a text informative");
                done();
            });
        });
        it("PUT /user - no update without giving full fields", (done) => {
            chai_1.default
                .request(urlBase)
                .put("/user/4")
                .end((err, res) => {
                (0, chai_2.expect)(res, "Verify that the necessary fields are entered").to.have.status(400);
                res.text.should.be.equal("missing required fields", "should return a text informative");
                done();
            });
        });
        it("PUT /user - check if user already exists", (done) => {
            chai_1.default
                .request(urlBase)
                .put("/user/4000")
                .send({ name: "josue" })
                .end((err, res) => {
                (0, chai_2.expect)(res, "analyze if existing user is checked before update").to.have.status(400);
                (0, chai_2.expect)(res.body, "should return a object").should.be.a("object");
                res.body.message.should.equal("No existe ningúna usuario con el identificador proporcionado", "should return a text informative");
                done();
            });
        });
    });
    describe("DELETE /user", () => {
        it("DELETE /user - check if user already exists before delete", (done) => {
            chai_1.default
                .request(urlBase)
                .delete("/user/4000")
                .end((err, res) => {
                (0, chai_2.expect)(res, "analyze if existing user is checked before delete").to.have.status(400);
                (0, chai_2.expect)(res.body, "should return a object").should.be.a("object");
                res.body.message.should.equal("No existe ningun usuario con el identificador proporcionado", "should return a text informative");
                done();
            });
        });
    });
});
