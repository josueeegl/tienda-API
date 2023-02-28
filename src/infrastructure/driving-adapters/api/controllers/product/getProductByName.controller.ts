import { ProductGetByNameUseCase } from "../../../../../application/productUseCases/ProductGetterByNameUseCase";
import { NextFunction, Request, Response } from "express";
import { ProductRepositoryImplementation } from "../../../../implementations/ProductRepositoryImplementation";
import { ProductAttributes } from "../../../../../domain/entities/product";

export const getProductByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.params;
    const prodRepoImplementation = new ProductRepositoryImplementation();
    const prodGetByNameUseCase = new ProductGetByNameUseCase(
      prodRepoImplementation
    );

    if (name) {
      const product: ProductAttributes | null =
        await prodGetByNameUseCase.run(name);

      res.status(200).json(product);
    } else {
      res.status(400).send("missing name of product");
    }
  } catch (e) {
    next(e);
  }
};
