import { Request, Response } from "express";
import { AuthService } from "../../services/AuthService";

class AuthController{
    async handleLogin(req:Request, res:Response){

        const {email, password} = req.body;
        const authService = new AuthService();

        const user = await authService.login(email, password);

        return res.json(user);
    }
}

export { AuthController }