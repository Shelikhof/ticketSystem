import { CreateRoleDto } from "./dto/createRole.dto";
import { Role } from "./roles.model";
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: typeof Role);
    create(dto: CreateRoleDto): Promise<Role>;
    getAll(): Promise<Role[]>;
    getById(id: string): Promise<Role>;
    deleteById(id: string): Promise<Role>;
    editById(id: string, dto: CreateRoleDto): Promise<Role>;
}
