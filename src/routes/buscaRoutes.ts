import { Router } from 'express';
import { UserCreateController } from '../controllers/UserCreateController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { AuthController } from '../controllers/auth/AuthController';
import { CategoryController } from '../controllers/category/CategoryController';


const router = Router();

//Routes user
//Create User
router.post("/create", authMiddleware, new UserCreateController().handle);


//List all users
router.get("/users", authMiddleware, new UserCreateController().handleGetUser )


//authenticated
router.post("/login", new AuthController().handleLogin);


//router.post("/transactions",);



//Routes category

router.post("/category", authMiddleware, new CategoryController().handleCategory)

export default router;