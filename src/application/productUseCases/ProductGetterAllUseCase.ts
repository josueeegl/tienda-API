import {
  ProductAttributes,
  ProductRepository,
} from "./productModule";

export class ProductGetAllUseCase {
  private readonly _productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
  }

  run = async (): Promise<ProductAttributes[] | null> => {
    const products: ProductAttributes[] | null =
      await this._productRepository.getAll();
    return products;
  };
}
