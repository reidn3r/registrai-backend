import { AuthProvider } from "./providers/auth/auth.provider";

declare module "@fastify/awilix" {
    interface Cradle {
        authProvider: AuthProvider;
    }
}
