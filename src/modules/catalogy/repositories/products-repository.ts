import { CreateAttributeDto } from "../dtos/create-attribute.dto";
import { CreateProductDTO } from "../dtos/create-product.dto";
import { CreateVariantDTO } from "../dtos/create-variant.dto";
import { Product, ProductInfo } from "../interfaces/Product";
import { ProductVariant } from "../interfaces/ProductVariant";

export abstract class ProductsRepository {
  abstract create(createProductDto: CreateProductDTO, slug: string): Promise<Product>
  abstract createVariant(createVariantDto: CreateVariantDTO, sku: string, product_id: string): Promise<ProductVariant>
  abstract getVariantQuantity(product_id: string): Promise<number>;
  abstract createAttribute(attributeInputValues: CreateAttributeDto): Promise<void>
  abstract getProductInfoById(id: string): Promise<ProductInfo>
}