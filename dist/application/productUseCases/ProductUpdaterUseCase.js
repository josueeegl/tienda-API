"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateUseCase = void 0;
const notFoundException_1 = require("../../domain/exceptions/notFoundException");
const existById_1 = require("../../domain/services/existById");
class ProductUpdateUseCase {
    _productRepository;
    _existsById;
    constructor(productRepository) {
        this._productRepository = productRepository;
        this._existsById = new existById_1.ExistById(productRepository);
    }
    run = async (body, id) => {
        const exists = await this._existsById.run(id);
        if (!exists)
            throw new notFoundException_1.NotFoundException("No existe ningún producto con el identificador proporcionado");
        await this._productRepository.update(body, id);
    };
}
exports.ProductUpdateUseCase = ProductUpdateUseCase;
