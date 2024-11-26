import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AuthSignupSchema } from "../interfaces/auth/auth-signup-schema";

export async function AuthSignup(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>()
        .post("/auth/signup", {
            schema: AuthSignupSchema
        }, async (request, reply) => {
            try{
                const supabase = app.diContainer.resolve("authProvider");

                const { email, password } = request.body;
                const { data, error } = await supabase.signupUser(email, password);
    
                if(error) return reply.status(error.status || 400).send({ error }); 
                return reply.status(200).send({ 
                    userId: data.user.id,
                    role: data.user.role,
                    email: data.user.email,
                });
            }
            catch(err:any){
                throw new Error(err.message);
            }
        });
}