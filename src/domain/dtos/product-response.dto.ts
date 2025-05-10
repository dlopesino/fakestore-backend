export class ProductResponseDTO {
  private constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly category: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly thumbnail: string,
    public readonly images: string[]
  ) {}

  static create(obj: Partial<ProductInput>): Result<ProductResponseDTO> {
    const {
      id,
      title,
      description,
      category,
      price,
      images,
      stock,
      thumbnail,
    } = obj;

    if (!id) return { ok: false, error: 'Missing product id' };
    if (!title) return { ok: false, error: 'Missing product title' };
    if (!description)
      return { ok: false, error: 'Missing product description' };
    if (!category) return { ok: false, error: 'Missing product category' };
    if (!price) return { ok: false, error: 'Missing product price' };
    if (!images) return { ok: false, error: 'Missing product images' };
    if (!stock) return { ok: false, error: 'Missing product stock' };
    if (!thumbnail) return { ok: false, error: 'Missing product thumbnail' };

    return {
      ok: true,
      value: new ProductResponseDTO(
        id,
        title,
        description,
        category,
        price,
        stock,
        thumbnail,
        images
      ),
    };
  }
}
