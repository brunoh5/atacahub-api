export interface Inventory {
  id: string;
  warehouse_id: string;
  product_variant_id: string;
  quantity_available: number;
  quantity_reserved: number;
}