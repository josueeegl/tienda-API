import { NotFoundException, ExistById, UserRepository } from "./userModule";

export class UserDeleterUseCase {
  private readonly _userRepository: UserRepository;
  private readonly _existsUserById: ExistById;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
    this._existsUserById = new ExistById(userRepository);
  }

  run = async (id: string): Promise<void> => {
    const userExists = await this._existsUserById.run(id);

    if (!userExists)
      throw new NotFoundException(
        "No existe ningun usuario con el identificador proporcionado"
      );

    await this._userRepository.delete(id);
  };
}
