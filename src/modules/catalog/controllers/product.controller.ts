import { Body, Controller, Post } from "@nestjs/common";
import { CreateProductDTO } from "../dtos/create-product.dto";
import { ProductService } from "../services/product.service";

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDTO) {
    const product = await this.productService.create(createProductDto);

    return {
      product
    }
  }
}