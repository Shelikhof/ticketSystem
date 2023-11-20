import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(userDto: CreateUserDto): Promise<import("./user.model").User>;
    getAll(): Promise<import("./user.model").User[]>;
    getAllByRole(role: string): Promise<{
        role: string;
        users: import("./user.model").User[];
    }>;
}
