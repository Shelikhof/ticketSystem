import { Ticket } from "./tickets.model";
import { Platform } from "src/platform/platform.model";
import { Group } from "src/groups/groups.model";
import { CreateTicketDto } from "./dto/createTicket.dto";
import { Certificate } from "src/certificates/certificates.model";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";
import { TicketStudents } from "./tickets-students.model";
import { ChangeStatusTicket } from "./dto/changeStatus.dto";
import { ChangeGettingStatus } from "./dto/changeGettingStatus.dto";
export declare class TicketsService {
    private ticketRepository;
    private platfromRepository;
    private groupRepository;
    private userRepository;
    private certificateRepository;
    private studentRepository;
    private ticketStudentsRepository;
    constructor(ticketRepository: typeof Ticket, platfromRepository: typeof Platform, groupRepository: typeof Group, userRepository: typeof User, certificateRepository: typeof Certificate, studentRepository: typeof Student, ticketStudentsRepository: typeof TicketStudents);
    create(dto: CreateTicketDto): Promise<Ticket>;
    getById(id: string): Promise<any>;
    getAll(): Promise<Ticket[]>;
    getAllWithLimitAndStatus(status: string, limit: number, page: number, userId: string, role: string): Promise<{
        count: number;
        page: number;
        limit: number;
        tickets: Ticket[];
    }>;
    getAllWithLimit(limit: number, page: number): Promise<{
        count: number;
        page: number;
        limit: number;
        tickets: Ticket[];
    }>;
    changeStatus(id: string, status: ChangeStatusTicket): Promise<void>;
    changeGettingStatus(ticketId: string, studentId: string, dto: ChangeGettingStatus): Promise<void>;
    delete(id: string): Promise<void>;
}
