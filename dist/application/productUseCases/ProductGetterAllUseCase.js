"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGetAllUseCase = void 0;
class ProductGetAllUseCase {
    _productRepository;
    constructor(productRepository) {
        this._productRepository = productRepository;
    }
    run = async () => {
        const products = await this._productRepository.getAll();
        return products;
    };
}
exports.ProductGetAllUseCase = ProductGetAllUseCase;
