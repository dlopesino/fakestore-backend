import { Router } from 'express';
import { ProductController } from './product.controller';
import { GetAllProductsUseCase } from '../../application';
import { PrismaProductRepository } from '../../infraestructure/repositories/prisma-product.repository';
import { prismaClient } from '../../config';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const repository = new PrismaProductRepository(prismaClient);
    const getAllProducts = new GetAllProductsUseCase(repository);
    const productController = new ProductController(getAllProducts);
    router.get('/', productController.getProducts);

    return router;
  }
}
