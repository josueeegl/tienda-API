"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncryptePassword = exports.getKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
const util_1 = require("util");
const randomBytesAsync = (0, util_1.promisify)(crypto_1.default.randomBytes);
const pbkdf2Async = (0, util_1.promisify)(crypto_1.default.pbkdf2);
async function getKey(size) {
    const salt = await randomBytesAsync(size);
    const newSalt = salt.toString("base64");
    return newSalt;
}
exports.getKey = getKey;
async function getEncryptePassword(password, salt) {
    const encryptedPasswordBuffer = await pbkdf2Async(password, salt, 10000, 64, "sha1");
    const encryptedPassword = encryptedPasswordBuffer.toString("base64");
    return encryptedPassword;
}
exports.getEncryptePassword = getEncryptePassword;
