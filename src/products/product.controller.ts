import { Controller, Get } from '@nestjs/common';
import ProductService from './product.service';
import { ProductDto } from './dtos';

@Controller('products')
export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('most-expansive')
  async getMostExpansiveProduct(): Promise<ProductDto> {
    return this.productService.getMostExpansiveProduct();
  }
}
