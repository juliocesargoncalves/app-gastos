import { Request, Response } from "express"
import { UserService } from "../services/UserService";

class UserCreateController{

 

    async handle(req: Request, res:Response){

       const {name, email, password} = req.body;
      const userService = new UserService();

        const user = await userService.create({name,email, password})

       return res.json(user)
    }

    async handleGetUser(req: Request, res:Response){

        const userService = new UserService();
        const users = await userService.findAll();

        return res.json(users)

    }

}


export {UserCreateController}