import { CreateGroupDto } from "./dto/createGroup.dto";
import { Group } from "./groups.model";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";
import { Platform } from "src/platform/platform.model";
export declare class GroupsService {
    private studentRepository;
    private groupRepository;
    private userRepository;
    private platformRepository;
    constructor(studentRepository: typeof Student, groupRepository: typeof Group, userRepository: typeof User, platformRepository: typeof Platform);
    create(dto: CreateGroupDto): Promise<Group>;
    edit(id: string, dto: CreateGroupDto): Promise<void>;
    delete(id: string): Promise<{
        id: string;
    }>;
    getById(id: string): Promise<Group>;
    getAll(): Promise<Group[]>;
    getAllWithLimit(limit: number, page: number): Promise<{
        count: number;
        page: number;
        limit: number;
        groups: Group[];
    }>;
    getBySearch(limit: number, page: number, searchValue: string): Promise<{
        count: number;
        page: number;
        limit: number;
        groups: Group[];
    }>;
    getGroupByCuratorId(id: string): Promise<Group>;
}
