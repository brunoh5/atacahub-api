import { CreateCategoryDTO } from "../dtos/create-category.dto";
import { Category } from "../interfaces/Category";

export abstract class CategoriesRepository {
  abstract findByName(name: string): Promise<Category | null>;
  abstract create(categoryInputValues: CreateCategoryDTO, slug: string): Promise<Category>;
}