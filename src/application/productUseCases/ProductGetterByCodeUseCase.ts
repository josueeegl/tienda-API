import {
  ProductAttributes,
  ProductRepository,
  NotFoundException,
} from "../usesCasesModules";

export class ProductGetByCodeUseCase {
  private readonly _productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
  }

  run = async (code: string): Promise<ProductAttributes | null> => {
    const product: ProductAttributes | null =
      await this._productRepository.getByCode(code);
    if (!product)
      throw new NotFoundException("no product with the given code: " + code);

    return product;
  };
}
