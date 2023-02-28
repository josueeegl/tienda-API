"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetAllUseCase = void 0;
class UserGetAllUseCase {
    _userRepository;
    constructor(userRepository) {
        this._userRepository = userRepository;
    }
    run = async () => {
        const users = await this._userRepository.getAll();
        return users;
    };
}
exports.UserGetAllUseCase = UserGetAllUseCase;
