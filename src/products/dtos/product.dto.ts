import { CustomElementHandle } from '../../crawler';

type ProductDtoParams = {
  title: string;
  description: string;
  imageUrl: any;
  price: number;
};

export default class ProductDto {
  title: string;
  description: string;
  imageUrl: any;
  price: number;

  static async create(
    productElementHandler: CustomElementHandle,
    rootPathPage: string,
  ): Promise<ProductDto> {
    const [priceText, title, description, imageRelativePath] =
      await Promise.all([
        productElementHandler.getTextContent('.inventory_item_price'),
        productElementHandler.getTextContent('.inventory_item_name'),
        productElementHandler.getTextContent('.inventory_item_desc'),
        productElementHandler.getSrcAttribute('img.inventory_item_img'),
      ]);

    const imageUrl = `${rootPathPage}${imageRelativePath}`;
    const price = parseFloat(priceText.replace('$', ''));

    return new ProductDto({
      title,
      description,
      imageUrl,
      price,
    });
  }

  private constructor(productDtoParams: ProductDtoParams) {
    this.title = productDtoParams.title;
    this.description = productDtoParams.description;
    this.imageUrl = productDtoParams.imageUrl;
    this.price = productDtoParams.price;
  }
}
