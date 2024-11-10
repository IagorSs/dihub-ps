import puppeteer from 'puppeteer';
import { CrawlerFactory } from '../interfaces';
import PuppeteerCrawler from './PuppeteerCrawler';

export default class PuppeteerCrawlerFactory implements CrawlerFactory {
  async create(rootPage: string): Promise<PuppeteerCrawler> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(rootPage);

    return new PuppeteerCrawler(browser, page, rootPage);
  }
}
