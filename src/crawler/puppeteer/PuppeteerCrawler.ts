import { Browser, Page } from 'puppeteer';
import { Crawler, CustomElementHandle } from '../interfaces';
import PuppeteerElementHandle from './PuppeteerElementHandle';

export default class PuppeteerCrawler implements Crawler {
  constructor(
    private readonly browser: Browser,
    private readonly page: Page,
    public readonly rootPage: string,
  ) {}

  async typeOnPage(querySelector: string, textToType: string): Promise<void> {
    return this.page.type(querySelector, textToType);
  }

  async click(querySelector: string): Promise<void> {
    return this.page.click(querySelector);
  }

  async searchAll(querySelector: string): Promise<CustomElementHandle[]> {
    const puppeteerElementHandles = await this.page.$$(querySelector);

    return puppeteerElementHandles.map(
      (puppeteerElementHandle) =>
        new PuppeteerElementHandle(this.page, puppeteerElementHandle),
    );
  }

  async finishJobs() {
    await this.browser.close();
  }
}
