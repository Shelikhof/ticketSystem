import { CreateGroupDto } from "./dto/createGroup.dto";
import { GroupsService } from "./groups.service";
export declare class GroupsController {
    private groupsService;
    constructor(groupsService: GroupsService);
    create(dto: CreateGroupDto): Promise<import("./groups.model").Group>;
    edit(): void;
    delete(groupId: string): Promise<{
        group: {
            id: string;
        };
    }>;
    getById(groupId: string): Promise<{
        group: import("./groups.model").Group;
    }>;
    getAll(): Promise<import("./groups.model").Group[]>;
}
