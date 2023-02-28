"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const ProductGetterAllUseCase_1 = require("../../../../../application/productUseCases/ProductGetterAllUseCase");
const ProductRepositoryImplementation_1 = require("../../../../implementations/ProductRepositoryImplementation");
const getAllProducts = async (req, res, next) => {
    try {
        const prodRepoImplementation = new ProductRepositoryImplementation_1.ProductRepositoryImplementation();
        const prodGetAllUseCase = new ProductGetterAllUseCase_1.ProductGetAllUseCase(prodRepoImplementation);
        const products = await prodGetAllUseCase.run();
        res.status(200).json(products);
    }
    catch (e) {
        next(e);
    }
};
exports.getAllProducts = getAllProducts;
