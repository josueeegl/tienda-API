"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsException = void 0;
const Exception_1 = require("./Exception");
class UserAlreadyExistsException extends Exception_1.Exception {
    constructor() {
        super("already exists");
        this.spanishMessage = "ya existe";
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
