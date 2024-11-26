import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ConfirmSignupSchema } from "../interfaces/auth/auth-confirm-signup-schema";

export async function AuthConfirmSignup(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>()
        .get("/auth/confirm", {
            schema: ConfirmSignupSchema
        }, async (request, reply) => {
            try{
                const supabase = request.diScope.resolve("authProvider");
    
                const { token_hash, type, next } = request.query;
                const { data, error } = await supabase.emailVerifyAndLogin(token_hash);
                if(!error) return reply.status(200).send({ role: data.message.user.role }); 
                    //redirect pro next
    
                return reply.status(400).send({message: "signup failed"});
            }
            catch(err:any){
                throw new Error(err.message);
            }

    })
}