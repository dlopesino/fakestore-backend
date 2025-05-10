import { InvalidProductError } from '../errors';

export class ProductEntity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public category: string,
    public price: number,
    public stock: number,
    public thumbnail: string,
    public images: string[]
  ) {}

  isInStock(): boolean {
    return this.stock > 0;
  }
  static fromObject(obj: Partial<ProductProps>): ProductEntity {
    const {
      id,
      title,
      description,
      category,
      price,
      stock,
      thumbnail,
      images,
    } = obj;
    if (!id) throw new InvalidProductError('Missing product id');
    if (!title) throw new InvalidProductError('Missing product title');
    if (!description)
      throw new InvalidProductError('Missing product description');
    if (!category) throw new InvalidProductError('Missing product category');
    if (!price) throw new InvalidProductError('Missing product price');
    if (stock == null) throw new InvalidProductError('Missing product stock');
    if (!thumbnail) throw new InvalidProductError('Missing product thumbnail');
    if (!images) throw new InvalidProductError('Missing product images');

    return new ProductEntity(
      id,
      title,
      description,
      category,
      price,
      stock,
      thumbnail,
      images
    );
  }
}
