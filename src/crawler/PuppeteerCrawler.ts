import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';
import { Crawler, CrawlerFactory, CustomElementHandle } from './Crawler';

class PuppeteerElementHandle implements CustomElementHandle {
  constructor(
    private readonly page: Page,
    private readonly elementHandle: ElementHandle,
  ) {}

  async getTextContent(querySelector: string): Promise<string> {
    const elementSearched = await this.elementHandle.$(querySelector);
    return this.page.evaluate((el) => el.textContent, elementSearched);
  }

  // TODO made this generic for all attributes
  // Don't work simple pass attribute as parameter, evaluate context don't understand
  async getSrcAttribute(querySelector: string): Promise<string> {
    const elementSearched = await this.elementHandle.$(querySelector);

    return this.page.evaluate((el) => el.getAttribute('src'), elementSearched);
  }
}

export class PuppeteerCrawler implements Crawler {
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

export class PuppeteerCrawlerFactory implements CrawlerFactory {
  async create(rootPage: string): Promise<PuppeteerCrawler> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(rootPage);

    return new PuppeteerCrawler(browser, page, rootPage);
  }
}
