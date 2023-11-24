import { Student } from "./student.model";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { Platform } from "src/platform/platform.model";
export declare class StudentsService {
    private studentRepository;
    private platformRepository;
    constructor(studentRepository: typeof Student, platformRepository: typeof Platform);
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
}
