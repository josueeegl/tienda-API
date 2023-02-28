import { NotFoundException } from "../../domain/exceptions/notFoundException";
import { ProductAttributes } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/productRepository";

export class ProductGetByIdUseCase {
  private readonly _productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
  }

  run = async (id: string): Promise<ProductAttributes | null> => {
    const product: ProductAttributes | null =
      await this._productRepository.getById(id);
    if (!product) throw new NotFoundException("no product with the given ID: " + id );

    return product;
  };
}
