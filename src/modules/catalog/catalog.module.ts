import { Module } from "@nestjs/common";
import { CategoryController } from "./controllers/category.controller";
import { ProductController } from "./controllers/product.controller";
import { CategoriesRepository } from "./repositories/categories-repository";
import { PgCategoriesRepository } from "./repositories/pg/pg-categories-repository";
import { PgProductsRepository } from "./repositories/pg/pg-products-repository";
import { ProductsRepository } from "./repositories/products-repository";
import { CategoryService } from "./services/category.service";
import { ProductService } from "./services/product.service";

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
