import { Module } from '@nestjs/common';
import ProductController from './product.controller';
import ProductService from './product.service';
import { PuppeteerCrawlerFactory } from '../crawler';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: 'CrawlerFactory',
      useClass: PuppeteerCrawlerFactory,
    },
    ProductService,
  ],
})
export default class ProductModule {}
