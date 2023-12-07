import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/createTicket.dto";
import { ChangeStatusTicket } from "./dto/changeStatus.dto";
import { ChangeGettingStatus } from "./dto/changeGettingStatus.dto";
export declare class TicketsController {
    private ticketService;
    constructor(ticketService: TicketsService);
    create(dto: CreateTicketDto): Promise<import("./tickets.model").Ticket>;
    getById(ticketId: string): Promise<any>;
    getAll(query: any): Promise<import("./tickets.model").Ticket[]> | Promise<{
        count: number;
        page: number;
        limit: number;
        tickets: import("./tickets.model").Ticket[];
    }>;
    changeStatus(ticketId: string, dto: ChangeStatusTicket): Promise<void>;
    changeStudentStatus(ticketId: string, studentId: string, dto: ChangeGettingStatus): Promise<void>;
    delete(ticketId: string): Promise<void>;
}
