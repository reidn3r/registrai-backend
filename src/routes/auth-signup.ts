import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AuthSignupSchema } from "../interfaces/auth/auth-signup-schema";
import { container } from "../ioc-container";
import { InversifyTypes } from "../config/types";
import { AuthService } from "../services/auth-service";

export async function AuthSignup(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>()
        .post("/auth/signup", {
            schema: AuthSignupSchema
        }, async (request, reply) => {
            try{
                const authService = container.get<AuthService>(InversifyTypes.AuthService);

                const { email, password, cpf, name, phone } = request.body;
                const data  = await authService.signup(email, password, cpf, name, phone);

                return reply.status(200).send({ 
                    userId: data.userId,
                    role: data.role,
                    email: data.email,
                });
            }
            catch(err:any){
                throw new Error(err.message);
            }
        });
}