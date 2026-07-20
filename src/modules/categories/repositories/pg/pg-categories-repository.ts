import { DatabaseService } from "@/infra/database/database.service";
import { CreateCategoryDTO } from "../../dtos/create-category.dto";
import { Category } from "../../interfaces/Category";
import { CategoriesRepository } from "../categories-repository";

export class PgCategoriesRepository implements CategoriesRepository {
  constructor(private readonly databaseService: DatabaseService) { }
  async findByName(name: string): Promise<Category | null> {
    const result = await this.databaseService.query({
      text: `
        SELECT * FROM categories WHERE LOWER(name) = $1
        VALUES(LOWER($1))
      `,
      values: [
        name
      ]
    });

    return result.rows[0];
  }

  async create(categoryInputValues: CreateCategoryDTO, slug: string) {
    const result = await this.databaseService.query({
      text: `
        INSERT INTO categories(name, description, sort_order, parent_id, slug)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
      `,
      values: [
        categoryInputValues.name,
        categoryInputValues.description,
        categoryInputValues.sort_order,
        categoryInputValues.parent_id,
        slug,
      ],
    });

    return result.rows[0];
  }
}
