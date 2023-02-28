"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreatorUseCase = void 0;
const userAlreadyExistsException_1 = require("../../domain/exceptions/userAlreadyExistsException");
const existByCode_1 = require("../../domain/services/existByCode");
class ProductCreatorUseCase {
    _productRepository;
    _existProductByCode;
    constructor(productRepository) {
        this._productRepository = productRepository;
        this._existProductByCode = new existByCode_1.ExistByCode(productRepository);
    }
    run = async (body) => {
        const productExists = await this._existProductByCode.run(body.product_code);
        if (productExists)
            throw new userAlreadyExistsException_1.UserAlreadyExistsException();
        const product = await this._productRepository.create(body);
        return product;
    };
}
exports.ProductCreatorUseCase = ProductCreatorUseCase;
