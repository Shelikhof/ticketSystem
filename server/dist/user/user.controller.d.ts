import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(query: any): Promise<import("./user.model").User[]> | Promise<{
        count: number;
        page: number;
        limit: number;
        users: import("./user.model").User[];
    }>;
    getById(userId: string): Promise<import("./user.model").User>;
    edit(userId: string, dto: CreateUserDto): Promise<{
        user: {
            id: string;
        };
    }>;
    delete(userId: string): Promise<{
        user: {
            id: string;
        };
    }>;
}
