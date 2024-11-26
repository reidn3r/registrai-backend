import { injectable } from "inversify";
import { prisma } from "../providers/db/prisma.provider";
import { PrismaClient } from "@prisma/client";

@injectable()
export class UserRepository{
    private client:PrismaClient;

    constructor(){
        this.client = prisma;
    }

    async save(id:string, email:string, name:string, cpf:string, phone:string){
        return await this.client.tb_user.create({
            data: {
                user_id: id,
                email,
                cpf,
                name,
                phone
            }
        })
    }
}