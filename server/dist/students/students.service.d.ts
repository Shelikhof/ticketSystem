import { Student } from "./student.model";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { Platform } from "src/platform/platform.model";
import { Group } from "src/groups/groups.model";
import { User } from "src/user/user.model";
export declare class StudentsService {
    private studentRepository;
    private platformRepository;
    private userRepository;
    private groupRepository;
    constructor(studentRepository: typeof Student, platformRepository: typeof Platform, userRepository: typeof User, groupRepository: typeof Group);
    create(dto: CreateStudentDto): Promise<{
        student: {
            id: string;
        };
    }>;
    edit(id: string, dto: CreateStudentDto): Promise<{
        student: {
            id: string;
        };
    }>;
    getById(id: string): Promise<Student>;
    delete(id: string): Promise<{
        student: {
            id: string;
        };
    }>;
    getAll(): Promise<Student[]>;
    getAllWithLimit(page: number, limit: number): Promise<{
        count: number;
        page: number;
        limit: number;
        students: Student[];
    }>;
    getBySearch(page: number, limit: number, searchValue: string): Promise<{
        count: number;
        page: number;
        limit: number;
        students: Student[];
    }>;
    getFreeStudents(searchValue: string): Promise<Student[]>;
}
