import axios from 'axios';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

export class LoadProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<void> {
    const response = await axios.get(
      'https://dummyjson.com/products?limit=100'
    );
    const { products } = response.data;
    for (const p of products) {
      const product = ProductEntity.fromObject(p);
      await this.productRepository.save(product);
    }
  }
}
