import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err.details && { details: err.details })
    });
  }

  // Erros não tratados
  console.error('Internal Error:', err.stack); // Log completo apenas no servidor
  return res.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro interno no servidor'
  });
}