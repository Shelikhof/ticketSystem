import { Model } from "sequelize-typescript";
import { Ticket } from "src/tickets/tickets.model";
interface ICreateCertificate {
    title: string;
}
export declare class Certificate extends Model<Certificate, ICreateCertificate> {
    id: string;
    title: string;
    tickets: Ticket[];
}
export {};
