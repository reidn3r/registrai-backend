import "dotenv/config";
import "./container";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import { AuthSignup } from "./routes/auth-signup";
import { AuthConfirmSignup } from "./routes/auth-confirm-signup-token";

const app = fastify();

//Type provider
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

//Dependency Injection
app.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true,
    injectionMode: "CLASSIC"
});

//Routes
app.register(AuthSignup);
app.register(AuthConfirmSignup);


const PORT: number = Number(process.env.APP_PORT) || 8000;
app.listen({ port: PORT }, () => console.log(`running at port: ${PORT}`));
