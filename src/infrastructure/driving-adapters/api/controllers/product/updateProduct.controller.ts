import { ProductUpdateUseCase } from "../../../../../application/productUseCases/ProductUpdaterUseCase";
import { ProductGetByIdUseCase } from "../../../../../application/productUseCases/ProductGetterByIdUseCase";
import { NextFunction, Request, Response } from "express";
import { ProductRepositoryImplementation } from "../../../../implementations/ProductRepositoryImplementation";
import { ProductAttributes } from "../../../../../domain/entities/product";

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const prodRepoImplementation = new ProductRepositoryImplementation();
    const prodUpdateUseCase = new ProductUpdateUseCase(prodRepoImplementation);
    const prodGetByIdUseCase = new ProductGetByIdUseCase(
      prodRepoImplementation
    );

    const product: ProductAttributes | null = await prodGetByIdUseCase.run(id);

    await prodUpdateUseCase.run(
      {
        product_code: req.body.product_code
          ? req.body.product_code
          : product!.product_code,
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
      },
      id
    );

    res.status(201).send("user updated successfully");
  } catch (e) {
    next(e);
  }
};
