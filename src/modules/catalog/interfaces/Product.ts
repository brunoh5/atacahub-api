import { ProductVariant } from "./ProductVariant.js";

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  category: {
    id: string;
    name: string;
  }
}

export type ProductInfo = Product & {
  variants: ProductVariant[],
}