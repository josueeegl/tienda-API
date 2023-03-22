import {
  UserAlreadyExistsException,
  ExistByCode,
  ProductAttributes,
  ProductRepository,
} from "../usesCasesModules";

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
