import { UserRepository } from "domain/repositories/userRepository";
import { ProductRepository } from "domain/repositories/productRepository";

export class ExistById {
  private readonly _repository: UserRepository | ProductRepository;

  constructor(repository: UserRepository | ProductRepository) {
    this._repository = repository;
  }

  run = async (id: string): Promise<boolean> => {
    const values = await this._repository.getById(id);

    if (values !== null) return true;

    return false;
  };
}
