"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const UserGetterAllUseCase_1 = require("../../../../../application/userUseCases/UserGetterAllUseCase");
const UserRepositoryImplementation_1 = require("../../../../implementations/UserRepositoryImplementation");
const getAllUsers = async (req, res, next) => {
    try {
        const UserRepoImplementation = new UserRepositoryImplementation_1.UserRepositoryImplementation();
        const userGetAllUseCase = new UserGetterAllUseCase_1.UserGetAllUseCase(UserRepoImplementation);
        const users = await userGetAllUseCase.run();
        res.status(200).json(users);
    }
    catch (e) {
        next(e);
    }
};
exports.getAllUsers = getAllUsers;
