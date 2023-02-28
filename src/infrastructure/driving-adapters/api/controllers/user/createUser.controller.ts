import { UserCreatorUseCase } from "../../../../../application/userUseCases/UserCreatorUseCase";
import { NextFunction, Request, Response } from "express";
import { UserRepositoryImplementation } from "../../../../implementations/UserRepositoryImplementation";
import * as utils from "../../../../../utils/encrypted/encryptPassword";
import { v4 } from "uuid";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, name, password } = req.body;
    if (name && username && password) {
      const id_user: string = v4();
      const salt: string = await utils.getKey(16);
      const encryptedPassword: string = await utils.getEncryptePassword(
        password,
        salt
      );
      const UserRepoImplementation = new UserRepositoryImplementation();
      const userCreatorUseCase = new UserCreatorUseCase(UserRepoImplementation);
      const newUser = await userCreatorUseCase.run({
        id_user,
        name,
        username,
        password: encryptedPassword,
        salt,
      });

      res.status(201).json(newUser);
    } else {
      res.status(400).send("missing fields");
    }
  } catch (e) {
    next(e);
  }
};
