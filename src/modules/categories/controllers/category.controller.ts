import { Body, Controller, Post } from "@nestjs/common";
import { CreateCategoryDTO } from "../dtos/create-category.dto";
import { CategoryService } from "../services/category.service";

@Controller("/categories")
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDTO) {
    const category = await this.categoryService.create(createCategoryDto);

    return { category };
  }
}