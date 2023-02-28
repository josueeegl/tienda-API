import { ProductRepository } from "domain/repositories/productRepository";

export class ExistByCode {
  private readonly _repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this._repository = repository;
  }

  run = async (code: string): Promise<boolean> => {
    const values = await this._repository.getByCode(code);

    if (values !== null) return true;

    return false;
  };
}
