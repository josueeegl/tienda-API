import {
  NotFoundException,
  ExistUserByUsername,
  UserAttributes,
  UserRepository,
} from "../usesCasesModules";

export class UserGetByUsernameUseCase {
  private readonly _userRepository: UserRepository;
  private readonly _existsUserByUsername: ExistUserByUsername;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
    this._existsUserByUsername = new ExistUserByUsername(userRepository);
  }

  run = async (username: string): Promise<UserAttributes | null> => {
    const userExists: boolean = await this._existsUserByUsername.run(username);
    if (!userExists)
      throw new NotFoundException("no user with the given username");

    const user: UserAttributes | null =
      await this._userRepository.getByUsername(username);
    return user;
  };
}
