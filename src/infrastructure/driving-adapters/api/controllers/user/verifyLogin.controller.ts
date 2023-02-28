import { UserGetByUsernameUseCase } from "../../../../../application/userUseCases/UserGetterByUsernameUseCase";
import { NextFunction, Request, Response } from "express";
import { UserRepositoryImplementation } from "../../../../implementations/UserRepositoryImplementation";
import { UserAttributes } from "../../../../../domain/entities/user";
import * as utils from "../../../../../utils/encrypted/encryptPassword";

export const verifyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const UserRepoImplementation = new UserRepositoryImplementation();
    const userGetByUsernameUseCase = new UserGetByUsernameUseCase(
      UserRepoImplementation
    );

    if (username && password) {
      const user: UserAttributes | null = await userGetByUsernameUseCase.run(
        username
      );
      const encryptedPassword: string = await utils.getEncryptePassword(
        password,
        user?.salt
      );
      if (encryptedPassword === user?.password) {
        res.status(200).json(user);
      } else {
        res.status(200).json({
          message: "wrong password or username",
        });
      }
    } else {
      res.status(400).send("missing password or username");
    }
  } catch (e) {
    next(e);
  }
};
