import "reflect-metadata";
import { injectable, inject } from "inversify";
import { AuthProvider } from "../providers/auth/auth.provider";
import { InversifyTypes } from "../config/types";
import { UserRepository } from "../repository/user-repository";

@injectable()
export class AuthService {

    private authProvider:AuthProvider;
    private userRepository:UserRepository;

    constructor(
        @inject(InversifyTypes.AuthProvider) authProvider: AuthProvider,
        @inject(InversifyTypes.UserRepository) userRepository: UserRepository
    ){
        this.authProvider = authProvider;
        this.userRepository = userRepository;
        }

    public async signup(email:string, password:string,  cpf:string, name:string, phone:string){
        const { data, error } = await this.authProvider.signupUser(email, password);

        if(error) throw new Error(error.message);
        if(!data || !data.user) throw new Error("Error creating new user.");
        
        await this.userRepository.save(data.user.id, email, name, cpf, phone);

        return { 
            userId: data.user.id,
            role: data.user.role,
            email: data.user.email,
        }
    }

    public async confirmSignup(token:string){
        const { data, error } = await this.authProvider.emailVerifyAndLogin(token);
        if(error) throw new Error("Error at email validation.");
        return { role: data.user?.role };
    }
}