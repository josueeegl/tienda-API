import { UserAttributes } from "../../domain/entities/user";
import { UserAlreadyExistsException } from "../../domain/exceptions/userAlreadyExistsException";
import { UserRepository } from "../../domain/repositories/userRepository";
import { ExistUserByUsername } from "../../domain/services/existUserByUsername";

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository;
  private readonly _existsUserByUsername: ExistUserByUsername;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
    this._existsUserByUsername = new ExistUserByUsername(userRepository);
  }

  run = async (body: UserAttributes): Promise<UserAttributes> => {
    const userExists: boolean = await this._existsUserByUsername.run(
      body.username
    ); 

    if (userExists) throw new UserAlreadyExistsException();

    const user = await this._userRepository.create(body);
    return user;
  };
}
