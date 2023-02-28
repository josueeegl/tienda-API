"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGetByCodeUseCase = void 0;
const notFoundException_1 = require("../../domain/exceptions/notFoundException");
class ProductGetByCodeUseCase {
    _productRepository;
    constructor(productRepository) {
        this._productRepository = productRepository;
    }
    run = async (code) => {
        const product = await this._productRepository.getByCode(code);
        if (!product)
            throw new notFoundException_1.NotFoundException("no product with the given code: " + code);
        return product;
    };
}
exports.ProductGetByCodeUseCase = ProductGetByCodeUseCase;
