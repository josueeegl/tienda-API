"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGetByNameUseCase = void 0;
const notFoundException_1 = require("../../domain/exceptions/notFoundException");
class ProductGetByNameUseCase {
    _productRepository;
    constructor(productRepository) {
        this._productRepository = productRepository;
    }
    run = async (name) => {
        const product = await this._productRepository.getByName(name);
        if (!product)
            throw new notFoundException_1.NotFoundException("no product with the given name: " + name);
        return product;
    };
}
exports.ProductGetByNameUseCase = ProductGetByNameUseCase;
