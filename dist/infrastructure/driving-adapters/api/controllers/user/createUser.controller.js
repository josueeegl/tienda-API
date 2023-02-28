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
exports.createUser = void 0;
const UserCreatorUseCase_1 = require("../../../../../application/userUseCases/UserCreatorUseCase");
const UserRepositoryImplementation_1 = require("../../../../implementations/UserRepositoryImplementation");
const utils = __importStar(require("../../../../../utils/encrypted/encryptPassword"));
const uuid_1 = require("uuid");
const createUser = async (req, res, next) => {
    try {
        const { username, name, password } = req.body;
        if (name && username && password) {
            const id_user = (0, uuid_1.v4)();
            const salt = await utils.getKey(16);
            const encryptedPassword = await utils.getEncryptePassword(password, salt);
            const UserRepoImplementation = new UserRepositoryImplementation_1.UserRepositoryImplementation();
            const userCreatorUseCase = new UserCreatorUseCase_1.UserCreatorUseCase(UserRepoImplementation);
            const newUser = await userCreatorUseCase.run({
                id_user,
                name,
                username,
                password: encryptedPassword,
                salt,
            });
            res.status(201).json(newUser);
        }
        else {
            res.status(400).send("missing fields");
        }
    }
    catch (e) {
        next(e);
    }
};
exports.createUser = createUser;
