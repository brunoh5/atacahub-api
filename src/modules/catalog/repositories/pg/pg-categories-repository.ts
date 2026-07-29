import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/infra/database/database.service";
import { CreateCategoryDTO } from "../../dtos/create-category.dto";
import { Category } from "../../interfaces/Category";
import { CategoriesRepository } from "../categories-repository";

@Injectable()
export class PgCategoriesRepository implements CategoriesRepository {
  constructor(private readonly databaseService: DatabaseService) { }

  async findByName(name: string): Promise<Category | null> {
    const result = await this.databaseService.query({
      text: `
        SELECT * FROM categories WHERE LOWER(name) = LOWER($1)
      `,
      values: [name],
    });

    return result.rows[0];
  }

  async create(categoryInputValues: CreateCategoryDTO, slug: string) {
    const result = await this.databaseService.query({
      text: `
        WITH query_insert AS (
          INSERT INTO
            categories(name, description, sort_order, parent_id, slug)
          VALUES
            ($1, $2, $3, $4, $5)
          RETURNING
            id, name, slug, description, sort_order, parent_id
        )
        SELECT 
          query_insert.id,
          query_insert.name,
          query_insert.slug,
          query_insert.description,
          query_insert.sort_order,
          CASE 
            WHEN query_insert.parent_id IS NOT NULL THEN
              json_build_object(
                'id', categories.id,
                'name', categories.name,
                'slug', categories.slug
              ) 
          END AS parent
        FROM 
          query_insert
        LEFT JOIN categories 
          ON query_insert.parent_id = categories.id
      `,
      values: [
        categoryInputValues.name,
        categoryInputValues.description,
        categoryInputValues.sort_order,
        categoryInputValues.parent_id,
        slug
      ]
    });

    return result.rows[0];
  }
}
