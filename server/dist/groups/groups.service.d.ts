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
    edit(): Promise<void>;
    delete(id: string): Promise<{
        group: {
            id: string;
        };
    }>;
    getById(id: string): Promise<{
        group: Group;
    }>;
    getAll(): Promise<Group[]>;
}
