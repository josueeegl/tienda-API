import { UserGetAllUseCase } from "../../../../../application/userUseCases/UserGetterAllUseCase";
import { NextFunction, Request, Response } from "express";
import { UserRepositoryImplementation } from "../../../../implementations/UserRepositoryImplementation";
import { UserAttributes } from "../../../../../domain/entities/user";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const UserRepoImplementation = new UserRepositoryImplementation();
    const userGetAllUseCase = new UserGetAllUseCase(UserRepoImplementation);

    const users: UserAttributes[] | null = await userGetAllUseCase.run();

    res.status(200).send(JSON.stringify(users));
  } catch (e) {
    next(e);
  }
};
