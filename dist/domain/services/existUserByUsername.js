"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistUserByUsername = void 0;
class ExistUserByUsername {
    _userRepository;
    constructor(userRepository) {
        this._userRepository = userRepository;
    }
    run = async (username) => {
        const user = await this._userRepository.getByUsername(username);
        if (user !== null)
            return true;
        return false;
    };
}
exports.ExistUserByUsername = ExistUserByUsername;
