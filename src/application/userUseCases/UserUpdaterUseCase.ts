import {
  NotFoundException,
  ExistById,
  UserAttributes,
  UserRepository,
} from "./userModule";

export class UserUpdateUseCase {
  private readonly _userRepository: UserRepository;
  private readonly _existsUserById: ExistById;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
    this._existsUserById = new ExistById(userRepository);
  }

  run = async (body: UserAttributes, id: string): Promise<void> => {
    const userExists = await this._existsUserById.run(id);

    if (!userExists)
      throw new NotFoundException(
        "No existe ningúna usuario con el identificador proporcionado"
      );

    await this._userRepository.update(body, id);
  };
}
