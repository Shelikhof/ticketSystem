import { User } from "./user.model";
import { CreateUserDto } from "./dto/createUser.dto";
import { Role } from "src/roles/roles.model";
import { Platform } from "src/platform/platform.model";
import { EditUserDto } from "./dto/editUser.dto";
export declare class UserService {
    private userRepository;
    private roleRepository;
    private platformRepository;
    constructor(userRepository: typeof User, roleRepository: typeof Role, platformRepository: typeof Platform);
    createUser(dto: CreateUserDto): Promise<User>;
    getUserByLogin(login: string): Promise<User>;
    getById(id: string): Promise<User>;
    getAllBySearchAndRole(searchValue: string, roleId: string, page: number, limit: number): Promise<{
        searchValue: string;
        count: number;
        page: number;
        limit: number;
        users: User[];
    }>;
    getAllBySearch(searchValue: string, page: number, limit: number): Promise<{
        searchValue: string;
        count: number;
        page: number;
        limit: number;
        users: User[];
    }>;
    getAllByRoleAndPlatform(roleId: string, platformId: string, page: number, limit: number): Promise<{
        count: number;
        page: number;
        limit: number;
        users: User[];
    }>;
    getAllWithPagination(page: number, limit: number): Promise<{
        count: number;
        page: number;
        limit: number;
        users: User[];
    }>;
    getAll(): Promise<User[]>;
    getTeacherBySearch(searchValue: string): Promise<User[]>;
    edit(id: string, dto: EditUserDto): Promise<{
        user: {
            id: string;
        };
    }>;
    delete(id: string): Promise<{
        user: {
            id: string;
        };
    }>;
}
