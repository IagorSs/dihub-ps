import { Inject, Injectable } from '@nestjs/common';
import { ProductDto } from './dtos';
import { CrawlerFactory } from '../crawler';

@Injectable()
export default class ProductService {
  constructor(
    @Inject('CrawlerFactory') private readonly crawlerFactory: CrawlerFactory,
  ) {}

  async getMostExpansiveProduct(): Promise<ProductDto> {
    const rootPage = 'https://www.saucedemo.com';
    const crawler = await this.crawlerFactory.create(rootPage);

    await crawler.typeOnPage('#user-name', 'standard_user');
    await crawler.typeOnPage('#password', 'secret_sauce');
    await crawler.click('#login-button');

    const productsElements = await crawler.searchAll('.inventory_item');

    const products = await Promise.all(
      productsElements.map((productElement) =>
        ProductDto.create(productElement, rootPage),
      ),
    );

    crawler.finishJobs();

    return products.reduce((mostExpansiveProduct, product) => {
      return product.price > mostExpansiveProduct.price
        ? product
        : mostExpansiveProduct;
    }, products[0]);
  }
}
