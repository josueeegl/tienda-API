"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const ProductCreatorUseCase_1 = require("../../../../../application/productUseCases/ProductCreatorUseCase");
const ProductRepositoryImplementation_1 = require("../../../../implementations/ProductRepositoryImplementation");
const uuid_1 = require("uuid");
const createProduct = async (req, res, next) => {
    try {
        if (req.body.product_code && req.body.name && req.body.price) {
            const id_producto = (0, uuid_1.v4)();
            const ProductRepoImplementation = new ProductRepositoryImplementation_1.ProductRepositoryImplementation();
            const prodCreatorUseCase = new ProductCreatorUseCase_1.ProductCreatorUseCase(ProductRepoImplementation);
            const newProduct = await prodCreatorUseCase.run({
                id_producto: id_producto,
                product_code: req.body.product_code,
                description: req.body.description ? req.body.description : "",
                name: req.body.name,
                price: req.body.price ? req.body.price : 0.0,
                sale_price: req.body.sale_price ? req.body.sale_price : 0.0,
                discount: req.body.discount ? req.body.discount : 0.0,
                manufacturer: req.body.manufacturer ? req.body.manufacturer : "BAJAJ",
                units: req.body.units ? req.body.units : 1,
                notes: req.body.notes ? req.body.notes : "",
                image_url: req.body.image_url
                    ? req.body.image_url
                    : "https://res.cloudinary.com/josueeegl/image/upload/v1677519729/productos-tienda/7560297_sb3xdc.jpg",
                model: req.body.model ? req.body.model : "no especificado",
            });
            res.status(201).json(newProduct);
        }
        else {
            res.status(400).send("missing fields");
        }
    }
    catch (e) {
        next(e);
    }
};
exports.createProduct = createProduct;
