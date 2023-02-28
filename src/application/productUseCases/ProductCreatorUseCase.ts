import { UserAlreadyExistsException } from "../../domain/exceptions/userAlreadyExistsException";
import { ExistByCode } from "../../domain/services/existByCode";
import { ProductAttributes } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/productRepository";

export class ProductCreatorUseCase {
  private readonly _productRepository: ProductRepository;
  private readonly _existProductByCode: ExistByCode;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
    this._existProductByCode = new ExistByCode(productRepository);
  }

  run = async (body: ProductAttributes): Promise<ProductAttributes> => {
    const productExists: boolean = await this._existProductByCode.run(
      body.product_code
    );

    if (productExists) throw new UserAlreadyExistsException();

    const product = await this._productRepository.create(body);
    return product;
  };
}
