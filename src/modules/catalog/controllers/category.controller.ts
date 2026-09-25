import { Body, Controller, Post } from "@nestjs/common";
import { CreateCategoryDTO } from "../dtos/create-category.dto.js";
import { CategoryService } from "../services/category.service.js";

@Controller("/categories")
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDTO) {
    const category = await this.categoryService.create(createCategoryDto);

    return { category };
  }
}