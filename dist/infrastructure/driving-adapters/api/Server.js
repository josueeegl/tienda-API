"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
class Server {
    app;
    port;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.middlewares();
        this.app.use(routes_1.default);
    }
    listen = () => {
        this.app.listen(this.port, () => {
            console.log("listening on port " + this.port);
        });
    };
    middlewares = () => {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    };
}
exports.default = Server;
