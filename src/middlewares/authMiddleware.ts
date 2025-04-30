// auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Verificar se o header Authorization existe
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // 2. Verificar formato do header (Bearer <token>)
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Formato de token inválido' });
    }

    // 3. Extrair e verificar o token
    const token = parts[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    req.userId = decoded.userId;
    next();
    
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};