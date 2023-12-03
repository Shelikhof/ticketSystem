import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/createStudent.dto";
export declare class StudentsController {
    private studentsService;
    constructor(studentsService: StudentsService);
    create(dto: CreateStudentDto): Promise<{
        student: {
            id: string;
        };
    }>;
    edit(studentId: string, dto: CreateStudentDto): Promise<{
        student: {
            id: string;
        };
    }>;
    delete(studentId: string): Promise<{
        student: {
            id: string;
        };
    }>;
    getById(studentId: string): Promise<import("./student.model").Student>;
    getAll(query: any): Promise<{
        count: number;
        page: number;
        limit: number;
        students: import("./student.model").Student[];
    }> | Promise<import("./student.model").Student[]>;
}
