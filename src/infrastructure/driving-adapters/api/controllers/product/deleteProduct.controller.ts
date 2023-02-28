import { ProductDeleterUseCase } from "../../../../../application/productUseCases/ProductDeleterUseCase";
import { NextFunction, Request, Response } from "express";
import { ProductRepositoryImplementation } from "../../../../implementations/ProductRepositoryImplementation";

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const prodRepoImplementation = new ProductRepositoryImplementation();
    const prodDeleterUseCase = new ProductDeleterUseCase(prodRepoImplementation);

    await prodDeleterUseCase.run(id);

    res.status(200).json("user deleted successfully");
  } catch (e) {
    next(e);
  }
};
