export interface ProductAttributes {
  id_producto?: string;
  product_code: string;
  description?: string;
  name: string;
  price: number;
  sale_price: number;
  discount: number;
  manufacturer: string;
  units: number;
  notes?: string;
  image_url: string;
  model?: string;
}
