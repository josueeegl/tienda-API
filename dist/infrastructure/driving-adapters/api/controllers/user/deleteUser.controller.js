"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const UserDeleterUseCase_1 = require("../../../../../application/userUseCases/UserDeleterUseCase");
const UserRepositoryImplementation_1 = require("../../../../implementations/UserRepositoryImplementation");
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const UserRepoImplementation = new UserRepositoryImplementation_1.UserRepositoryImplementation();
        const userDeleterUseCase = new UserDeleterUseCase_1.UserDeleterUseCase(UserRepoImplementation);
        await userDeleterUseCase.run(id);
        res.status(200).json("user deleted successfully");
    }
    catch (e) {
        next(e);
    }
};
exports.deleteUser = deleteUser;
