"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetByUsernameUseCase = void 0;
const notFoundException_1 = require("../../domain/exceptions/notFoundException");
const existUserByUsername_1 = require("../../domain/services/existUserByUsername");
class UserGetByUsernameUseCase {
    _userRepository;
    _existsUserByUsername;
    constructor(userRepository) {
        this._userRepository = userRepository;
        this._existsUserByUsername = new existUserByUsername_1.ExistUserByUsername(userRepository);
    }
    run = async (username) => {
        const userExists = await this._existsUserByUsername.run(username);
        if (!userExists)
            throw new notFoundException_1.NotFoundException("no user with the given username");
        const user = await this._userRepository.getByUsername(username);
        return user;
    };
}
exports.UserGetByUsernameUseCase = UserGetByUsernameUseCase;
