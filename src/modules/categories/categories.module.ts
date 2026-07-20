import { Module } from "@nestjs/common";
import { CategoryController } from "./controllers/category.controller";
import { CategoryService } from "./services/category.service";

@Module({
  providers: [
    CategoryService
  ],
  controllers: [
    CategoryController
  ]
})
export class CategoriesModule { }