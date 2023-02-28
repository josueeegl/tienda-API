import { ProductAttributes } from "../entities/product";

export interface ProductRepository {
  getById: (id: string) => Promise<ProductAttributes | null>;
  getByCode: (code: string) => Promise<ProductAttributes | null>;
  getByName: (name: string) => Promise<ProductAttributes | null>;
  getAll: () => Promise<ProductAttributes[] | null>;
  create: (product: ProductAttributes) => Promise<ProductAttributes>;
  update: (product: ProductAttributes, id: string) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
