import { CreateAttributeDto } from "../dtos/create-attribute.dto.js";
import { CreateProductDTO } from "../dtos/create-product.dto.js";
import { CreateVariantDTO } from "../dtos/create-variant.dto.js";
import { Product, ProductInfo } from "../interfaces/Product.js";
import { ProductVariant } from "../interfaces/ProductVariant.js";

export abstract class ProductsRepository {
  abstract create(createProductDto: CreateProductDTO, slug: string): Promise<Product>
  abstract createVariant(createVariantDto: CreateVariantDTO, sku: string, product_id: string): Promise<ProductVariant>
  abstract getVariantQuantity(product_id: string): Promise<number>;
  abstract createAttribute(attributeInputValues: CreateAttributeDto): Promise<void>
  abstract getProductInfoById(id: string): Promise<ProductInfo>
  abstract findBySlug(slug: string): Promise<Product | null>
}