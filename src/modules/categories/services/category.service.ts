import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCategoryDTO } from "../dtos/create-category.dto";
import { CategoriesRepository } from "../repositories/categories-repository";

@Injectable()
export class CategoryService {
  constructor(private readonly categoriesRepository: CategoriesRepository) { }

  async create(createCategoryDto: CreateCategoryDTO) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(createCategoryDto.name);

    if (categoryAlreadyExists) {
      throw new ConflictException("Categoria já existe");
    }

    const category = await this.categoriesRepository.create(createCategoryDto, "");

    return category;
  }
}