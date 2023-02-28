import { UserDeleterUseCase } from "../../../../../application/userUseCases/UserDeleterUseCase";
import { NextFunction, Request, Response } from "express";
import { UserRepositoryImplementation } from "../../../../implementations/UserRepositoryImplementation";

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const UserRepoImplementation = new UserRepositoryImplementation();
    const userDeleterUseCase = new UserDeleterUseCase(UserRepoImplementation);

    await userDeleterUseCase.run(id);

    res.status(200).json("user deleted successfully");
  } catch (e) {
    next(e);
  }
};
