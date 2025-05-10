import { ProductEntity } from './product.entity';

describe('product.entity.test.ts', () => {
  const objectTest = {
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
  };

  test('should create a ProductEntity instance correctly', () => {
    const productEntity = ProductEntity.fromObject(objectTest);
    expect(productEntity).toBeInstanceOf(ProductEntity);
    expect(productEntity.description).toBe(objectTest.description);
    expect(productEntity.isInStock()).toBeTruthy();
  });

  test('should return false for isInStock when stock is zero', () => {
    const product = ProductEntity.fromObject({ ...objectTest, stock: 0 });
    expect(product.isInStock()).toBeFalsy();
  });
});
