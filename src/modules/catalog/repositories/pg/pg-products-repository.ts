import { Injectable } from "@nestjs/common";
import { QueryResult } from "pg";
import { DatabaseService } from "@/infra/database/database.service.js";
import { CreateAttributeDto } from "../../dtos/create-attribute.dto.js";
import { CreateProductDTO } from "../../dtos/create-product.dto.js";
import { CreateVariantDTO } from "../../dtos/create-variant.dto.js";
import { Product, ProductInfo } from "../../interfaces/Product.js";
import { ProductVariant } from "../../interfaces/ProductVariant.js";
import { ProductsRepository } from "../products-repository.js";

@Injectable()
export class PgProductsRepository implements ProductsRepository {
  constructor(private readonly databaseService: DatabaseService) { }
  async findBySlug(slug: string): Promise<Product | null> {
    const result = await this.databaseService.query({
      text: `
        SELECT * FROM products WHERE slug = $1
      `,
      values: [slug]
    })


    return result.rows[0];
  }

  async create(
    createProductDto: CreateProductDTO,
    slug: string,
  ): Promise<Product> {
    const result = await this.databaseService.query({
      text: /* sql */ `
        WITH query_insert AS (
          INSERT INTO products(category_id, name, slug, description, status)
          VALUES($1, $2, $3, $4, $5)
          RETURNING *
        )
        SELECT 
          query_insert.*, 
          JSON_BUILD_OBJECT(
            'id', categories.id,
            'name', categories.name
          ) as category
        FROM query_insert
        LEFT JOIN categories
        ON query_insert.category_id = categories.id
      `,
      values: [
        createProductDto.category_id,
        createProductDto.name,
        slug,
        createProductDto.description,
        createProductDto.status,
      ],
    });

    return result.rows[0];
  }

  async createVariant(
    createVariantDto: CreateVariantDTO,
    sku: string,
    product_id: string,
  ): Promise<ProductVariant> {
    const result = await this.databaseService.query({
      text: `
        INSERT INTO
          product_variants(product_id, sku, price, cost_price)
        VALUES($1, $2, $3, $4)
        RETURNING *
      `,
      values: [
        product_id,
        sku,
        createVariantDto.price,
        createVariantDto.cost_price,
      ],
    });

    return result.rows[0];
  }

  getVariantQuantity(product_id: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async createAttribute(
    attributeInputValues: CreateAttributeDto,
  ): Promise<void> {
    await this.databaseService.transactions(async (tx) => {
      let attributeSelectQuery: QueryResult;

      attributeSelectQuery = await tx({
        text: `
          SELECT id FROM attributes WHERE code = $1
        `,
        values: [attributeInputValues.code],
      });

      if (attributeSelectQuery.rowCount === 0) {
        attributeSelectQuery = await tx({
          text: `
            INSERT INTO attributes(name, code)
            VALUES(INITCAP($1), LOWER($1))
            RETURNING *
          `,
          values: [attributeInputValues.code],
        });
      }

      const attributeValueInsertQuery = await tx({
        text: `
          INSERT INTO attribute_values(attribute_id, value)
          VALUES($1, $2)
          RETURNING id
        `,
        values: [attributeSelectQuery.rows[0].id, attributeInputValues.value],
      });

      await tx({
        text: `
          INSERT INTO product_attributes(product_variant_id, attribute_value_id)
          VALUES($1, $2)
          RETURNING *
        `,
        values: [
          attributeInputValues.variant_id,
          attributeValueInsertQuery.rows[0].id,
        ],
      });
    });
  }

  async getProductInfoById(id: string): Promise<ProductInfo> {
    const result = await this.databaseService.query({
      text: /* sql */ `
        WITH variants AS (
          SELECT
            pv.id,
            pv.sku,
            pv.price,
            pv.cost_price,
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'code', attributes.code,
                'value', attribute_values.value
              )
            ) as attributes
          FROM product_variants pv
          LEFT JOIN product_attributes
            ON product_attributes.product_variant_id = pv.id
          LEFT JOIN attribute_values
            ON product_attributes.attribute_value_id = attribute_values.id
          LEFT JOIN attributes
            ON attributes.id = attribute_values.attribute_id
          WHERE product_id = $1
          AND pv.is_active = true
          GROUP BY pv.id, pv.sku, pv.cost_price, pv.price
        )
        SELECT
          p.name,
          p.description,
          p.short_description,
          p.slug,
          JSON_BUILD_OBJECT(
            'name', categories.name,
            'slug', categories.slug
          ) AS category,
          (
            SELECT COALESCE(JSON_AGG(variants), '[]') FROM variants
          ) AS variants
        FROM products p
        LEFT JOIN categories
          ON p.category_id = categories.id
        WHERE p.id = $1
      `,
      values: [id],
    });

    return result.rows[0];
  }
}
