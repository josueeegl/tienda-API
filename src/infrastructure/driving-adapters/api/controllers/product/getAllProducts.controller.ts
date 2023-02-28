import { ProductGetAllUseCase } from "../../../../../application/productUseCases/ProductGetterAllUseCase";
import { NextFunction, Request, Response } from "express";
import { ProductRepositoryImplementation } from "../../../../implementations/ProductRepositoryImplementation";
import { ProductAttributes } from "../../../../../domain/entities/product";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const prodRepoImplementation = new ProductRepositoryImplementation();
    const prodGetAllUseCase = new ProductGetAllUseCase(prodRepoImplementation);

    const products: ProductAttributes[] | null = await prodGetAllUseCase.run();

    res.status(200).json(products);
  } catch (e) {
    next(e);
  }
};
