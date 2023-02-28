"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception extends Error {
    spanishMessage = "";
    constructor(message) {
        super(message);
    }
}
exports.Exception = Exception;
