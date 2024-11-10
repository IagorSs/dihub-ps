export interface CustomElementHandle {
  getTextContent(querySelector: string): Promise<string>;
  getSrcAttribute(querySelector: string): Promise<string>;
}

export interface Crawler {
  /**
   * Don't use this object or any derivative after use this method
   */
  finishJobs(): Promise<void>;

  typeOnPage(querySelector: string, textToType: string): Promise<void>;
  click(querySelector: string): Promise<void>;

  searchAll(querySelector: string): Promise<CustomElementHandle[]>;
}

export interface CrawlerFactory {
  create(rootPage: string): Promise<Crawler>;
}
