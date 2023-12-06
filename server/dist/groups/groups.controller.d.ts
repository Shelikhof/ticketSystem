import { CreateGroupDto } from "./dto/createGroup.dto";
import { GroupsService } from "./groups.service";
export declare class GroupsController {
    private groupsService;
    constructor(groupsService: GroupsService);
    create(dto: CreateGroupDto): Promise<import("./groups.model").Group>;
    edit(groupId: string, dto: CreateGroupDto): Promise<void>;
    delete(groupId: string): Promise<{
        id: string;
    }>;
    getById(groupId: string): Promise<import("./groups.model").Group>;
    getAll(query: any): Promise<import("./groups.model").Group> | Promise<{
        count: number;
        page: number;
        limit: number;
        groups: import("./groups.model").Group[];
    }> | Promise<import("./groups.model").Group[]>;
}
