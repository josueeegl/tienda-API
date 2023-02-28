"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = void 0;
const ProductDeleterUseCase_1 = require("../../../../../application/productUseCases/ProductDeleterUseCase");
const ProductRepositoryImplementation_1 = require("../../../../implementations/ProductRepositoryImplementation");
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodRepoImplementation = new ProductRepositoryImplementation_1.ProductRepositoryImplementation();
        const prodDeleterUseCase = new ProductDeleterUseCase_1.ProductDeleterUseCase(prodRepoImplementation);
        await prodDeleterUseCase.run(id);
        res.status(200).json("user deleted successfully");
    }
    catch (e) {
        next(e);
    }
};
exports.deleteProduct = deleteProduct;
