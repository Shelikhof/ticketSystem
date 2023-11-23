import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/createRole.dto";
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    create(dto: CreateRoleDto): Promise<import("./roles.model").Role>;
    getAll(): Promise<import("./roles.model").Role[]>;
    getById(roleId: string): Promise<import("./roles.model").Role>;
    delete(roleId: string): Promise<import("./roles.model").Role>;
    edit(roleId: string, dto: CreateRoleDto): Promise<import("./roles.model").Role>;
}
