import { injectable } from "inversify";
import { prisma } from "../providers/db/prisma.provider";
import { CATEGORY, PrismaClient, Tb_transactions, Tb_user, TRANSACTION_STATUS, TRANSACTION_TYPE } from "@prisma/client";

@injectable()
export class UserRepository{
    private client:PrismaClient;
    
    constructor(){
        this.client = prisma;
    }

    async save(id:string, email:string, name:string, cpf:string, phone:string):Promise<Tb_user>{
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

    async createUserTransaction(userId:string, category:CATEGORY, value:number, type:TRANSACTION_TYPE, description:string | null | undefined, status:TRANSACTION_STATUS):Promise<Tb_transactions>{
        const foundCategory = await this.client.tb_category.findUnique({ where: { name: category } });
        
        if(!foundCategory) throw new Error("Category not found.");
        
        return await this.client.tb_transactions.create({
            data: {
                tb_userUser_id: userId,
                tb_categoryCategory_id: foundCategory.category_id,
                value: value,
                influx_outflux: type,
                description: description,
                status: status
            }
        });    
    }
}