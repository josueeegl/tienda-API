"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const UserUpdaterUseCase_1 = require("../../../../../application/userUseCases/UserUpdaterUseCase");
const UserRepositoryImplementation_1 = require("../../../../implementations/UserRepositoryImplementation");
const updateUser = async (req, res, next) => {
    try {
        const { name, username } = req.body;
        const { id } = req.params;
        if (!name || !id || !username) {
            res.status(400).send("missing required fields");
            return;
        }
        const UserRepoImplementation = new UserRepositoryImplementation_1.UserRepositoryImplementation();
        const userUpdateUseCase = new UserUpdaterUseCase_1.UserUpdateUseCase(UserRepoImplementation);
        await userUpdateUseCase.run({ username: username, name: name, password: "", salt: "" }, id);
        res.status(201).send("user updated successfully");
    }
    catch (e) {
        next(e);
    }
};
exports.updateUser = updateUser;
