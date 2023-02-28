import { UserUpdateUseCase } from "../../../../../application/userUseCases/UserUpdaterUseCase";
import { NextFunction, Request, Response } from "express";
import { UserRepositoryImplementation } from "../../../../implementations/UserRepositoryImplementation";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, username } = req.body;
    const { id } = req.params;

    if (!name || !id || !username) {
      res.status(400).send("missing required fields");
      return;
    }
    const UserRepoImplementation = new UserRepositoryImplementation();
    const userUpdateUseCase = new UserUpdateUseCase(UserRepoImplementation);
 
    await userUpdateUseCase.run({ username: username, name: name, password: "", salt: "" }, id);

    res.status(201).send("user updated successfully");
  } catch (e) {
    next(e);
  }
};
