import { CreateRoleDto } from "./dto/createRole.dto";
import { Role } from "./roles.model";
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: typeof Role);
    create(dto: CreateRoleDto): Promise<Role>;
    getById(id: string): Promise<Role>;
    getAll(): Promise<Role[]>;
}
