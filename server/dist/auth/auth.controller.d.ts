import { CreateUserDto } from "src/user/dto/createUser.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: LoginDto): Promise<{
        token: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        user: {
            id: string;
        };
    }>;
}
