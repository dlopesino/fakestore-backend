import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { InvalidProductError, InvalidUserError } from '../../../domain/errors';
import { CustomError } from '../errors/custom-error';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // * Errores HTTP ya formateados
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  // * Error de dominio -> traducirlo a HTTP (400)
  if (
    error instanceof InvalidProductError ||
    error instanceof InvalidUserError
  ) {
    const httpError = CustomError.badRequest(error.message);
    res.status(httpError.statusCode).json({ error: httpError.message });
    return;
  }

  // * Otros errores inesperados
  console.error('Unexpected error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
};
