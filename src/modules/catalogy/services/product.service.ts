import { ConflictException, Injectable } from "@nestjs/common";
import { createSlug } from "@/shared/create-slug";
import { CreateProductDTO } from "../dtos/create-product.dto";
import { ProductsRepository } from "../repositories/products-repository";

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductsRepository) { }

  async create(createProductDto: CreateProductDTO) {
    const slug = createSlug(createProductDto.name);

    const checkIfSlugExists = await this.productRepository.findBySlug(slug);

    if (checkIfSlugExists) {
      throw new ConflictException("Produto com slug já cadastrado, verifique se o produto já foi cadastrado")
    }

    const product = await this.productRepository.create(
      createProductDto,
      slug,
    );

    for (const [index, variantData] of createProductDto.variants.entries()) {
      const category_sku = product.category.name.match(/.{1,3}/g)?.[0];
      const product_sku = product.name.match(/.{1,5}/g)?.[0];

      const next_sku =
        index + 1;
      const sku_number = next_sku.toString().padStart(5, "0");

      const sku = `${category_sku}-${product_sku}-${sku_number}`.toUpperCase();

      const variant = await this.productRepository.createVariant(
        variantData,
        sku,
        product.id
      );

      for (const { code, value } of variantData.attributes) {
        await this.productRepository.createAttribute({
          variant_id: variant.id,
          code,
          value,
        });
      }
    }

    const product_info = await this.productRepository.getProductInfoById(
      product.id,
    );

    return product_info;
  }
}
