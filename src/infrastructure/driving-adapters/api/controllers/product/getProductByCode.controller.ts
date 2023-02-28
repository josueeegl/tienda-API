import { ProductGetByCodeUseCase } from "../../../../../application/productUseCases/ProductGetterByCodeUseCase";
import { NextFunction, Request, Response } from "express";
import { ProductRepositoryImplementation } from "../../../../implementations/ProductRepositoryImplementation";
import { ProductAttributes } from "../../../../../domain/entities/product";

export const getProductByCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { code } = req.params;
    const prodRepoImplementation = new ProductRepositoryImplementation();
    const prodGetByCodeUseCase = new ProductGetByCodeUseCase(
      prodRepoImplementation
    );

    if (code) {
      const product: ProductAttributes | null =
        await prodGetByCodeUseCase.run(code);

      res.status(200).json(product);
    } else {
      res.status(400).send("missing code of product");
    }
  } catch (e) {
    next(e);
  }
};
