import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateTransactionSchema } from "../interfaces/transactions/create-transaction-schema";
import { container } from "../ioc-container";
import { UserRepository } from "../repository/user-repository";
import { InversifyTypes } from "../config/types";

export async function CreateTransaction(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>()
        .post("/transactions", { schema: CreateTransactionSchema }, async (request, reply) => {
            try{
                const { userId, category, value, type, description, status } = request.body;
                const userRepository = container.get<UserRepository>(InversifyTypes.UserRepository);
    
                const newTransaction = await userRepository.createUserTransaction(userId, category, value, type, description, status);
                
                return reply.status(201).send({ 
                    transaction_id: newTransaction.transaction_id,
                    value: newTransaction.value,
                    status: newTransaction.status,
                    influx_outflux: newTransaction.influx_outflux,
                    createdAt: newTransaction.createdAt,
                });
            }
            catch(err){
                throw new Error("Error while creating new transaction.");
            }
        })
}