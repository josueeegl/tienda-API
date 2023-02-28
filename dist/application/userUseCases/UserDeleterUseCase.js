"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleterUseCase = void 0;
const notFoundException_1 = require("../../domain/exceptions/notFoundException");
const existById_1 = require("../../domain/services/existById");
class UserDeleterUseCase {
    _userRepository;
    _existsUserById;
    constructor(userRepository) {
        this._userRepository = userRepository;
        this._existsUserById = new existById_1.ExistById(userRepository);
    }
    run = async (id) => {
        const userExists = await this._existsUserById.run(id);
        if (!userExists)
            throw new notFoundException_1.NotFoundException("No existe ningun usuario con el identificador proporcionado");
        await this._userRepository.delete(id);
    };
}
exports.UserDeleterUseCase = UserDeleterUseCase;
