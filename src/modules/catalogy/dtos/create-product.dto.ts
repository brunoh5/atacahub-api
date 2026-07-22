export class CreateProductDTO {
  category_id: string;
  name: string;
  description: string;
  short_description: string;
  status: "draft" | "active" | "inactive" | "discontinued" | "archived";
  variants: {
    cost_price: number;
    price: number;
    attributes: {
      code: string;
      value: string;
    }[]
  }[]
}
