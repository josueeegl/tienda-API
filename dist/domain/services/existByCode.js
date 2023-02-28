"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistByCode = void 0;
class ExistByCode {
    _repository;
    constructor(repository) {
        this._repository = repository;
    }
    run = async (code) => {
        const values = await this._repository.getByCode(code);
        if (values !== null)
            return true;
        return false;
    };
}
exports.ExistByCode = ExistByCode;
