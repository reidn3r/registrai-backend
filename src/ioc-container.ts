import { Container } from "inversify";
import { AuthProvider } from "./providers/auth/auth.provider";
import { InversifyTypes } from "./config/types";
import { AuthService } from "./services/auth-service";
import { UserRepository } from "./repository/user-repository";

const container = new Container();

container.bind<AuthProvider>(InversifyTypes.AuthProvider).to(AuthProvider);
container.bind<AuthService>(InversifyTypes.AuthService).to(AuthService);
container.bind<UserRepository>(InversifyTypes.UserRepository).to(UserRepository);

export { container };