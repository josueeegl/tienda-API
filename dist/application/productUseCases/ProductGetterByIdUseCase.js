"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGetByIdUseCase = void 0;
const notFoundException_1 = require("../../domain/exceptions/notFoundException");
class ProductGetByIdUseCase {
    _productRepository;
    constructor(productRepository) {
        this._productRepository = productRepository;
    }
    run = async (id) => {
        const product = await this._productRepository.getById(id);
        if (!product)
            throw new notFoundException_1.NotFoundException("no product with the given ID: " + id);
        return product;
    };
}
exports.ProductGetByIdUseCase = ProductGetByIdUseCase;
