"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByName = void 0;
const ProductGetterByNameUseCase_1 = require("../../../../../application/productUseCases/ProductGetterByNameUseCase");
const ProductRepositoryImplementation_1 = require("../../../../implementations/ProductRepositoryImplementation");
const getProductByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const prodRepoImplementation = new ProductRepositoryImplementation_1.ProductRepositoryImplementation();
        const prodGetByNameUseCase = new ProductGetterByNameUseCase_1.ProductGetByNameUseCase(prodRepoImplementation);
        if (name) {
            const product = await prodGetByNameUseCase.run(name);
            res.status(200).json(product);
        }
        else {
            res.status(400).send("missing name of product");
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getProductByName = getProductByName;
