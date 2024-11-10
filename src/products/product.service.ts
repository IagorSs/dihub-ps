import { Injectable } from '@nestjs/common';
import { ProductDto } from './dtos';
import { PuppeteerCrawler } from '../crawler';

@Injectable()
export default class ProductService {
  async getMostExpansiveProduct(): Promise<ProductDto> {
    const rootPage = 'https://www.saucedemo.com';
    const crawler = await PuppeteerCrawler.create(rootPage);

    await crawler.typeOnPage('#user-name', 'standard_user');
    await crawler.typeOnPage('#password', 'secret_sauce');
    await crawler.click('#login-button');

    const productsElements = await crawler.searchAll('.inventory_item');

    const products = await Promise.all(
      productsElements.map((productElement) =>
        ProductDto.create(productElement, rootPage),
      ),
    );

    crawler.closeBrowser();

    return products.reduce((mostExpansiveProduct, product) => {
      return product.price > mostExpansiveProduct.price
        ? product
        : mostExpansiveProduct;
    }, products[0]);
  }
}
