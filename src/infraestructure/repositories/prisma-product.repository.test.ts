import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '../../../generated/prisma';
import { PrismaProductRepository } from './prisma-product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

describe('oprisma-product.repository.test', () => {
  // * 1) Creamos el mock con mockDeep
  // * mockDeep sirve cuando necesitas un mock profundo, es decir,
  // * un objeto que tiene subobjetos con métodos que también quieres mockear.
  const prismaMock = mockDeep<PrismaClient>();

  const repository = new PrismaProductRepository(prismaMock);

  const product = ProductEntity.fromObject({
    id: 1,
    title: 'Test Product',
    description: 'Test description',
    category: 'Category',
    price: 99.99,
    stock: 10,
    thumbnail: 'thumb.jpg',
    images: ['img1.jpg', 'img2.jpg'],
  });

  test('should save product using upsert', async () => {
    await repository.save(product);
    expect(prismaMock.product.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: product.id },
        update: expect.any(Object),
        create: expect.any(Object),
      })
    );
  });

  test('should return ProductEntity array on findAll', async () => {
    prismaMock.product.findMany.mockResolvedValue([
      {
        id: 1,
        title: 'Calvin Klein CK One',
        description:
          "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
        category: 'fragrances',
        price: 49.99,
        stock: 29,
        thumbnail:
          'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp',
        images: [
          'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp',
          'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp',
          'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const result = await repository.findAll({ limit: 10, offset: 0 });
    expect(result[0]).toBeInstanceOf(ProductEntity);
    expect(result[0].id).toBe(1);
    expect(result[0].title).toBe('Calvin Klein CK One');
  });
});
