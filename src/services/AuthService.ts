import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '10d';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido no arquivo .env');
  }

class AuthService {
  async login(email: string, password: string) {
    // 1. Verificar se usuário existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // 2. Verificar senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Credenciais inválidas');
    }

    // 3. Gerar token JWT
    const token = this.generateToken(user.id);

    // 4. Retornar dados do usuário (sem senha) e token
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  }

  generateToken(userId: string): string {
    const payload = { id: userId };
    const options: SignOptions = {
      expiresIn: JWT_EXPIRES_IN
    };

    return jwt.sign(payload, JWT_SECRET, options);
  }
  async verifyToken(token: string) {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET não configurada');
    }

    try {
      return jwt.verify(token, JWT_SECRET) as { id: string };
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export { AuthService }