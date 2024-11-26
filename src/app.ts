import "dotenv/config";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { AuthSignup } from "./routes/auth-signup";
import { AuthConfirmSignup } from "./routes/auth-confirm-signup-token";

const app = fastify();

//Type provider
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

//Routes
app.register(AuthSignup);
app.register(AuthConfirmSignup);


const PORT: number = Number(process.env.APP_PORT) || 8000;
app.listen({ port: PORT }, () => console.log(`running at port: ${PORT}`));
