import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Adicionamos a propriedade userId opcional
      user?: JwtPayload & { // Ou você pode adicionar um objeto user completo
        id: string;
        [key: string]: any;
      };
    }
  }
}