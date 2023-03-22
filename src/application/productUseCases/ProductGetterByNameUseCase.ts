import {
  ProductAttributes,
  ProductRepository,
  NotFoundException,
} from "../usesCasesModules";

export class ProductGetByNameUseCase {
  private readonly _productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
  }

  run = async (name: string): Promise<ProductAttributes | null> => {
    const product: ProductAttributes | null =
      await this._productRepository.getByName(name);
    if (!product)
      throw new NotFoundException("no product with the given name: " + name);

    return product;
  };
}
