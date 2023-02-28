import { ProductGetByIdUseCase } from "../../../../../application/productUseCases/ProductGetterByIdUseCase";
import { NextFunction, Request, Response } from "express";
import { ProductRepositoryImplementation } from "../../../../implementations/ProductRepositoryImplementation";
import { ProductAttributes } from "../../../../../domain/entities/product";

export const getProductByID = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const prodRepoImplementation = new ProductRepositoryImplementation();
    const prodGetByIdUseCase = new ProductGetByIdUseCase(
      prodRepoImplementation
    );

    if (id) {
      const product: ProductAttributes | null =
        await prodGetByIdUseCase.run(id);

      res.status(200).json(product);
    } else {
      res.status(400).send("missing id of product");
    }
  } catch (e) {
    next(e);
  }
};
