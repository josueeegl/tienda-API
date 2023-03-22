import {
  ProductAttributes,
  ProductRepository,
  NotFoundException,
  ExistById,
} from "./productModule";

export class ProductUpdateUseCase {
  private readonly _productRepository: ProductRepository;
  private readonly _existsById: ExistById;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
    this._existsById = new ExistById(productRepository);
  }

  run = async (body: ProductAttributes, id: string): Promise<void> => {
    const exists = await this._existsById.run(id);

    if (!exists)
      throw new NotFoundException(
        "No existe ningún producto con el identificador proporcionado"
      );

    await this._productRepository.update(body, id);
  };
}
