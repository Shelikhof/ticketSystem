import { Model } from "sequelize-typescript";
export declare class TicketStudents extends Model<TicketStudents> {
    id: string;
    isGet: boolean;
    ticketId: string;
    studentId: string;
}
