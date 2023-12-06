import { UserService } from "./user.service";
import { EditUserDto } from "./dto/editUser.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(query: any): Promise<import("./user.model").User[]> | Promise<{
        count: number;
        page: number;
        limit: number;
        users: import("./user.model").User[];
    }>;
    getTeachers(query: any): Promise<import("./user.model").User[]>;
    getById(userId: string): Promise<import("./user.model").User>;
    edit(userId: string, dto: EditUserDto): Promise<{
        user: {
            id: string;
        };
    }>;
    delete(userId: string): Promise<import("./user.model").User>;
}
