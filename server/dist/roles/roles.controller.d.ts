import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/createRole.dto";
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    create(dto: CreateRoleDto): Promise<import("./roles.model").Role>;
    getAll(): Promise<import("./roles.model").Role[]>;
}
