import { ConflictException, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { createSlug } from "@/shared/create-slug";
import { CreateCategoryDTO } from "../dtos/create-category.dto";
import { CategoriesRepository } from "../repositories/categories-repository";

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private eventEmitter: EventEmitter2,
  ) { }

  async create(createCategoryDto: CreateCategoryDTO) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      createCategoryDto.name,
    );

    if (categoryAlreadyExists) {
      throw new ConflictException("Categoria já existente");
    }

    const category = await this.categoriesRepository.create(
      createCategoryDto,
      createSlug(createCategoryDto.name),
    );

    this.eventEmitter.emit("domain.category.created", {
      action: "category.created",
      entity_type: "categories",
      entity_id: category.id,
      new_data: category,
    });

    return category;
  }
}
