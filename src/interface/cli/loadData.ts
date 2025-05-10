import { LoadProductsUseCase } from '../../application/usecases/load-products.usecase';
import { prismaClient } from '../../config/plugins/prisma.plugin';
import { PrismaProductRepository } from '../../infraestructure/repositories/prisma-product.repository';
import { PrismaUserRepository } from '../../infraestructure/repositories/prisma-user.repository';
import { LoadUsersUseCase } from '../../application/usecases/load-users.usecase';

export async function runMassiveLoad() {
  const productRepository = new PrismaProductRepository(prismaClient);
  const userRepository = new PrismaUserRepository(prismaClient);

  const loadProductsUseCase = new LoadProductsUseCase(productRepository);
  const loadUsersUseCase = new LoadUsersUseCase(userRepository);

  try {
    console.log('Cragando productos...');
    await loadProductsUseCase.execute();
    console.log('Productos cargados');

    console.log('\n Cargando usuarios...');
    await loadUsersUseCase.execute();
    console.log('Usuarios cargados');
  } catch (error) {
    console.error('Error en lacarga masiva', error);
  } finally {
    await prismaClient.$disconnect(); // * desconexion limpia de prisma
  }
}
