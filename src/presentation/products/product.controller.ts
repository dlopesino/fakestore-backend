import { NextFunction, Request, Response } from 'express';
import { GetAllProductsUseCase } from '../../application';

// * El controlador sólo se encarga de la lógica de negocio
export class ProductController {
  constructor(public readonly getAllproducts: GetAllProductsUseCase) {}

  // * Creamos el método como una función de flecha ya que si la creamos como una función normal nos puede mostrar errores en el "binding"
  // * las funciones de flecha no tienen su propio this -> toman el this del contrxto donde fueron definidas,
  // * en este caso, la instancia de la clase
  getProducts = (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10, offset = 0, category } = req.query;
    this.getAllproducts
      .execute({
        limit: Number(limit),
        offset: Number(offset),
        category: category as string | undefined,
      })
      .then((products) => res.status(200).json(products))
      .catch((error) => next(error));
    // * Ya no manejamos el error nosotros, sino que delegamos el error a express
  };
}
