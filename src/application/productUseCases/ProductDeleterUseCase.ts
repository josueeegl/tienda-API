import { NotFoundException } from "../../domain/exceptions/notFoundException";
import { ProductRepository } from "../../domain/repositories/productRepository";
import { ExistById } from "../../domain/services/existById";

export class ProductDeleterUseCase {
  private readonly _productRepository: ProductRepository;
  private readonly _existsById: ExistById;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
    this._existsById = new ExistById(productRepository);
  }

  run = async (id: string): Promise<void> => {
    const exists = await this._existsById.run(id);

    if (!exists)
      throw new NotFoundException(
        "No existe ningun producto con el identificador proporcionado"
      );

    await this._productRepository.delete(id);
  };
}
