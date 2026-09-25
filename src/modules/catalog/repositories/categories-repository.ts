import { CreateCategoryDTO } from "../dtos/create-category.dto.js";
import { Category } from "../interfaces/Category.js";

export abstract class CategoriesRepository {
  abstract findByName(name: string): Promise<Category | null>;
  abstract create(categoryInputValues: CreateCategoryDTO, slug: string): Promise<Category>;
}