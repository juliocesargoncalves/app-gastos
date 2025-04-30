import prismaClient from "../prisma";
import { ConflictError } from '../errors/AppError';
const bcrypt = require('bcryptjs');

interface UserRequest{
    name:string;
    email:string;
    password:string;
}


class UserService{
    async create({name, email, password}: UserRequest){
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(userAlreadyExists){
            throw new ConflictError('O endereço de e-mail já está em uso', {
                field: 'email',
                value: email,
                suggestion: 'Utilize outro endereço de e-mail ou recupere sua conta'
              });
        }

        const passwordHash = await bcrypt.hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name:name,
                email:email, 
                password: passwordHash}
            });

        return user;
    }



    async findAll(){
        const users = await prismaClient.user.findMany({
            select:{
                id:true,
                name:true,
                email:true,
                createdAt:true
            }   
        });
        return users;
    }
}

export {UserService}
