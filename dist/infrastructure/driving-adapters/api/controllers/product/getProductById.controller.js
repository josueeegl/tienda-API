"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByID = void 0;
const ProductGetterByIdUseCase_1 = require("../../../../../application/productUseCases/ProductGetterByIdUseCase");
const ProductRepositoryImplementation_1 = require("../../../../implementations/ProductRepositoryImplementation");
const getProductByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodRepoImplementation = new ProductRepositoryImplementation_1.ProductRepositoryImplementation();
        const prodGetByIdUseCase = new ProductGetterByIdUseCase_1.ProductGetByIdUseCase(prodRepoImplementation);
        if (id) {
            const product = await prodGetByIdUseCase.run(id);
            res.status(200).json(product);
        }
        else {
            res.status(400).send("missing id of product");
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getProductByID = getProductByID;
