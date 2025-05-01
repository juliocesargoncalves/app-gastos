import { Request, Response } from "express"
import { CategoryService } from "../../services/category/CategoryService"

class CategoryController{
    async handleCategory(req: Request, res:Response){

        const {category} = req.body;

 

        const categoryService = new CategoryService();

        const categoryCreate = await categoryService.createCategory({category});
        
        return res.json(categoryCreate)

    }

}

export { CategoryController }