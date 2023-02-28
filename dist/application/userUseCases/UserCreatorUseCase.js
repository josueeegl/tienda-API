"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatorUseCase = void 0;
const userAlreadyExistsException_1 = require("../../domain/exceptions/userAlreadyExistsException");
const existUserByUsername_1 = require("../../domain/services/existUserByUsername");
class UserCreatorUseCase {
    _userRepository;
    _existsUserByUsername;
    constructor(userRepository) {
        this._userRepository = userRepository;
        this._existsUserByUsername = new existUserByUsername_1.ExistUserByUsername(userRepository);
    }
    run = async (body) => {
        const userExists = await this._existsUserByUsername.run(body.username);
        if (userExists)
            throw new userAlreadyExistsException_1.UserAlreadyExistsException();
        const user = await this._userRepository.create(body);
        return user;
    };
}
exports.UserCreatorUseCase = UserCreatorUseCase;
