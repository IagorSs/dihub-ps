import { ElementHandle, Page } from 'puppeteer';
import { CustomElementHandle } from '../interfaces';

export default class PuppeteerElementHandle implements CustomElementHandle {
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
