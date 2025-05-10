import { PrismaClient } from '../../../generated/prisma';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async save(product: ProductEntity): Promise<void> {
    const productMapper = {
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
      images: product.images,
    };
    await this.prismaClient.product.upsert({
      where: { id: product.id },
      update: {
        ...productMapper,
      },
      create: {
        id: product.id,
        ...productMapper,
      },
    });
  }
  async findAll(params: GetAllProductsParams): Promise<ProductEntity[]> {
    const { limit, offset, category } = params;
    const products = await this.prismaClient.product.findMany({
      where: category ? { category } : {},
      skip: offset,
      take: limit,
    });
    return products.map(ProductEntity.fromObject);
  }
}
