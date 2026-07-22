export class CreateCategoryDTO {
  name: string;
  description: string;
  is_active?: boolean;
  sort_order: number;
  parent_id: string;
}