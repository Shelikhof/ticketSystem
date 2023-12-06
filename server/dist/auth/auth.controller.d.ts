import { CreateUserDto } from "src/user/dto/createUser.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            name: {
                firstName: string;
                lastName: string;
            };
            role: string;
        };
    }>;
    registration(userDto: CreateUserDto): Promise<{
        user: {
            id: string;
        };
    }>;
    validateToken(authorizationHeader: string): Promise<{
        token: string;
        user: {
            name: {
                firstName: string;
                lastName: string;
            };
            role: string;
        };
    }>;
}
