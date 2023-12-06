import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.model";
import { RolesService } from "src/roles/roles.service";
import { Role } from "src/roles/roles.model";
import { LoginDto } from "./dto/login.dto";
import { PlatformService } from "src/platform/platform.service";
import { Platform } from "src/platform/platform.model";
export declare class AuthService {
    private platformService;
    private userService;
    private rolesService;
    private jwtService;
    constructor(platformService: PlatformService, userService: UserService, rolesService: RolesService, jwtService: JwtService);
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
    generateToken(user: User, role: Role, platform: Platform): Promise<string>;
    validateUser(userDto: LoginDto): Promise<User>;
    validateToken(token: string): Promise<{
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
