export interface CustomElementHandle {
  getTextContent(querySelector: string): Promise<string>;
  getSrcAttribute(querySelector: string): Promise<string>;
}

export interface Crawler {
  typeOnPage(querySelector: string, textToType: string): Promise<void>;
  click(querySelector: string): Promise<void>;

  searchAll(querySelector: string): Promise<CustomElementHandle[]>;
}
