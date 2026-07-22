export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  cost_price: number;
  attributes: {
    code: string;
    value: string;
  }[]
}
