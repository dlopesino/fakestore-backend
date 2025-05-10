import { ProductEntity } from '../entities/product.entity';

/*
 * ¿Porqué usar una interfaz en lugar de clase abstracta?
 * Porque solo necesitamos definir la forma del contrato, no meter lógica ni estado
 * ¿Porqué usamos ProductEntity[] y no el modelo Prisma directamente?
 * Porque así desacoplamos el dominio de la infraestructura -> es un principio clave de arquitectura limpia
 */
export interface ProductRepository {
  save(product: ProductEntity): Promise<void>;
  findAll(params: GetAllProductsParams): Promise<ProductEntity[]>;
}
