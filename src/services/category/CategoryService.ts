import prismaClient from "../../prisma"

interface categoryRequest{
    category:string;
}

class CategoryService{

    async createCategory({ category } :categoryRequest){

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where:{
                category:category
            }
        })

        if(categoryAlreadyExists){
            throw new Error("Category already exists")
        }

        const newCategory = await prismaClient.category.create({
            data:{
                category:category
            }
        })

        return newCategory;
    }

}

export { CategoryService }