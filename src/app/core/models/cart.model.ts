import { productModel } from "src/app/pages/ecommerce/product.model";

export interface Cart {
  product: productModel;
  qty: number;
  price: number;
}
