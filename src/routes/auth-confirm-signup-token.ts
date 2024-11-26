import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ConfirmSignupSchema } from "../interfaces/auth/auth-confirm-signup-schema";
import { container } from '../ioc-container';
import { InversifyTypes } from "../config/types";
import { AuthService } from "../services/auth-service";

export async function AuthConfirmSignup(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>()
        .get("/auth/confirm", {
            schema: ConfirmSignupSchema
        }, async (request, reply) => {
            try{
                const authService = container.get<AuthService>(InversifyTypes.AuthService);

                const { token_hash, type, next } = request.query;

                const data = await authService.confirmSignup(token_hash);
                return reply.status(200).send({ role: data.role }); 
                    //redirect pro next    
            }
            catch(err:any){
                throw new Error(err.message);
            }

    })
}