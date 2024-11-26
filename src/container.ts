import { asClass, Lifetime } from "awilix";
import { diContainerClassic } from "@fastify/awilix";
import { AuthProvider } from "./providers/auth/auth.provider";

diContainerClassic.register({
    authProvider: asClass(AuthProvider, {
        lifetime: Lifetime.SINGLETON, //Apenas uma instância é criada e distribuída pelo sistema
    })
})
