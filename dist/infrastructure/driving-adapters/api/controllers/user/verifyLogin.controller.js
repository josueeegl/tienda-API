"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLogin = void 0;
const UserGetterByUsernameUseCase_1 = require("../../../../../application/userUseCases/UserGetterByUsernameUseCase");
const UserRepositoryImplementation_1 = require("../../../../implementations/UserRepositoryImplementation");
const utils = __importStar(require("../../../../../utils/encrypted/encryptPassword"));
const verifyLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const UserRepoImplementation = new UserRepositoryImplementation_1.UserRepositoryImplementation();
        const userGetByUsernameUseCase = new UserGetterByUsernameUseCase_1.UserGetByUsernameUseCase(UserRepoImplementation);
        if (username && password) {
            const user = await userGetByUsernameUseCase.run(username);
            const encryptedPassword = await utils.getEncryptePassword(password, user?.salt);
            if (encryptedPassword === user?.password) {
                res.status(200).json(user);
            }
            else {
                res.status(200).json({
                    message: "wrong password or username",
                });
            }
        }
        else {
            res.status(400).send("missing password or username");
        }
    }
    catch (e) {
        next(e);
    }
};
exports.verifyLogin = verifyLogin;
