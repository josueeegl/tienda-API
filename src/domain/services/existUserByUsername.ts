import { UserRepository } from "domain/repositories/userRepository";

export class ExistUserByUsername {
  private readonly _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  run = async (username: string): Promise<boolean> => {
    const user = await this._userRepository.getByUsername(username);

    if (user !== null) return true;

    return false;
  };
}
