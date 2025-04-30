import { Router } from 'express';
import { UserCreateController } from '../controllers/UserCreateController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { AuthController } from '../controllers/auth/AuthController';


const router = Router();

//Routes user
router.post("/create", new UserCreateController().handle);

router.post("/login", new AuthController().handleLogin);

router.get("/users", authMiddleware, new UserCreateController().handleGetUser )

export default router;