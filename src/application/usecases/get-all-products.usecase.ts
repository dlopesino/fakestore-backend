import { ProductEntity, ProductRepository } from '../../domain';

export class GetAllProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(params: GetAllProductsParams): Promise<ProductEntity[]> {
    return await this.repository.findAll(params);
  }
}
