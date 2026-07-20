export interface Category {
  id: string;
  parent_id?: string;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
}