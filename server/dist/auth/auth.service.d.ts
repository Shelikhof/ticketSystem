import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.model";
import { RolesService } from "src/roles/roles.service";
import { Role } from "src/roles/roles.model";
export declare class AuthService {
    private userService;
    private rolesService;
    private jwtService;
    constructor(userService: UserService, rolesService: RolesService, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    generateToken(user: User, role: Role): Promise<{
        token: string;
    }>;
    validateUser(userDto: CreateUserDto): Promise<User>;
}
