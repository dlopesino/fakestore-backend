import { PrismaClient } from '../../../generated/prisma';
import { PrismaProductRepository } from './prisma-product.repository';
import { ProductEntity } from '../../domain';

describe('prisma-product.repository (integration) test ', () => {
  const prisma = new PrismaClient();
  const repository = new PrismaProductRepository(prisma);

  beforeAll(async () => {
    // * Limpiar la tabla de productos antes de cada test (TRUNCATE)
    await prisma.product.deleteMany();
  });

  afterAll(async () => {
    // * desconectar al final de los tests
    await prisma.$disconnect();
  });

  test('should save and retrieve a product from the real DB', async () => {
    const product = ProductEntity.fromObject({
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
    });

    // * Save en la DB real(de testing)
    // * 1) Primero comprobamos que prisma escribe bien en la base de datos
    await repository.save(product);

    // * Recuperar
    // * 2) comprobamos que prisma recupera datos correctamente de la BD
    const products = await repository.findAll({ limit: 10, offset: 0 });

    // * 3) En general, hasta aquí hemos testeado que el PrismaProductRepository funciona bien de principio a fin (sin mocks)

    // * Assert: hay al menos un producto y es el que hemos guardado
    expect(products.length).toBeGreaterThan(0);

    const savedProduct = products.find((p) => p.id === product.id);
    expect(savedProduct).toBeDefined(); // * Asegura que una variable está definida, en este caso los productos
    expect(savedProduct?.title).toBe(product.title);
  });
});
