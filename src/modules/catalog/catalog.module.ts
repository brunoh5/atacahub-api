import { Module } from "@nestjs/common";
import { CategoryController } from "./controllers/category.controller.js";
import { ProductController } from "./controllers/product.controller.js";
import { CategoriesRepository } from "./repositories/categories-repository.js";
import { PgCategoriesRepository } from "./repositories/pg/pg-categories-repository.js";
import { PgProductsRepository } from "./repositories/pg/pg-products-repository.js";
import { ProductsRepository } from "./repositories/products-repository.js";
import { CategoryService } from "./services/category.service.js";
import { ProductService } from "./services/product.service.js";

@Module({
  providers: [
    {
      provide: CategoriesRepository,
      useClass: PgCategoriesRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PgProductsRepository,
    },
    CategoryService,
    ProductService,
  ],
  controllers: [CategoryController, ProductController],
})
export class CatalogModule { }
