"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDeleterUseCase = void 0;
const notFoundException_1 = require("../../domain/exceptions/notFoundException");
const existById_1 = require("../../domain/services/existById");
class ProductDeleterUseCase {
    _productRepository;
    _existsById;
    constructor(productRepository) {
        this._productRepository = productRepository;
        this._existsById = new existById_1.ExistById(productRepository);
    }
    run = async (id) => {
        const exists = await this._existsById.run(id);
        if (!exists)
            throw new notFoundException_1.NotFoundException("No existe ningun producto con el identificador proporcionado");
        await this._productRepository.delete(id);
    };
}
exports.ProductDeleterUseCase = ProductDeleterUseCase;
