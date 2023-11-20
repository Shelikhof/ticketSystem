import { User } from "./user.model";
import { CreateUserDto } from "./dto/createUser.dto";
import { Role } from "src/roles/roles.model";
export declare class UserService {
    private userRepository;
    private roleRepository;
    constructor(userRepository: typeof User, roleRepository: typeof Role);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsersByRole(roleTitle: string): Promise<{
        role: string;
        users: User[];
    }>;
    getUserByLogin(login: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
