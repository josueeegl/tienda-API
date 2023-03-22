import { UserAttributes, UserRepository } from "./userModule";

export class UserGetAllUseCase {
  private readonly _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  run = async (): Promise<UserAttributes[] | null> => {
    const users: UserAttributes[] | null = await this._userRepository.getAll();
    return users;
  };
}
