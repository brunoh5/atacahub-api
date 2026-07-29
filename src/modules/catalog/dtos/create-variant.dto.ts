export class CreateVariantDTO {
  cost_price: number;
  price: number;
  attributes: {
    code: string;
    value: string;
  }[]
}