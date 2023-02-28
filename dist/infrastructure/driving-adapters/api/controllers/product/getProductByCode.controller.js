"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByCode = void 0;
const ProductGetterByCodeUseCase_1 = require("../../../../../application/productUseCases/ProductGetterByCodeUseCase");
const ProductRepositoryImplementation_1 = require("../../../../implementations/ProductRepositoryImplementation");
const getProductByCode = async (req, res, next) => {
    try {
        const { code } = req.params;
        const prodRepoImplementation = new ProductRepositoryImplementation_1.ProductRepositoryImplementation();
        const prodGetByCodeUseCase = new ProductGetterByCodeUseCase_1.ProductGetByCodeUseCase(prodRepoImplementation);
        if (code) {
            const product = await prodGetByCodeUseCase.run(code);
            res.status(200).json(product);
        }
        else {
            res.status(400).send("missing code of product");
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getProductByCode = getProductByCode;
