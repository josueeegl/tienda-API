import { createProduct } from "./createProduct.controller";
import { getAllProducts } from "./getAllProducts.controller";
import { updateProduct } from "./updateProduct.controller";
import { deleteProduct } from "./deleteProduct.controller";
import { getProductByID } from "./getProductById.controller";
import { getProductByCode } from "./getProductByCode.controller";
import { getProductByName } from "./getProductByName.controller";

export { createProduct as createProductController };
export { getAllProducts as getAllProductsController };
export { updateProduct as updateProductController };
export { deleteProduct as deleteProductController };
export { getProductByID as getProductByIDController };
export { getProductByCode as getProductByCodeController };
export { getProductByName as getProductByNameController };
