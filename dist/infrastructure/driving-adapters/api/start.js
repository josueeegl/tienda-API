"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./Server"));
const dotenv_1 = __importDefault(require("dotenv"));
try {
    dotenv_1.default.config();
    new Server_1.default().listen();
}
catch (e) {
    console.log(e);
}
