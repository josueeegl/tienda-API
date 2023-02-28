"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
const ProductUpdaterUseCase_1 = require("../../../../../application/productUseCases/ProductUpdaterUseCase");
const ProductGetterByIdUseCase_1 = require("../../../../../application/productUseCases/ProductGetterByIdUseCase");
const ProductRepositoryImplementation_1 = require("../../../../implementations/ProductRepositoryImplementation");
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodRepoImplementation = new ProductRepositoryImplementation_1.ProductRepositoryImplementation();
        const prodUpdateUseCase = new ProductUpdaterUseCase_1.ProductUpdateUseCase(prodRepoImplementation);
        const prodGetByIdUseCase = new ProductGetterByIdUseCase_1.ProductGetByIdUseCase(prodRepoImplementation);
        const product = await prodGetByIdUseCase.run(id);
        await prodUpdateUseCase.run({
            product_code: req.body.product_code
                ? req.body.product_code
                : product.product_code,
            description: req.body.description
                ? req.body.description
                : product?.description,
            name: req.body.name ? req.body.name : product?.name,
            price: req.body.price ? req.body.price : product?.price,
            sale_price: req.body.sale_price
                ? req.body.sale_price
                : product?.sale_price,
            discount: req.body.discount ? req.body.discount : product?.discount,
            manufacturer: req.body.manufacturer
                ? req.body.manufacturer
                : product?.manufacturer,
            units: req.body.units ? req.body.units : product?.units,
            notes: req.body.notes ? req.body.notes : product?.notes,
            image_url: req.body.image_url ? req.body.image_url : product?.image_url,
            model: req.body.model ? req.body.model : product?.model,
        }, id);
        res.status(201).send("user updated successfully");
    }
    catch (e) {
        next(e);
    }
};
exports.updateProduct = updateProduct;
