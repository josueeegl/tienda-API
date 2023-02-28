"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistById = void 0;
class ExistById {
    _repository;
    constructor(repository) {
        this._repository = repository;
    }
    run = async (id) => {
        const values = await this._repository.getById(id);
        if (values !== null)
            return true;
        return false;
    };
}
exports.ExistById = ExistById;
