import { Model } from "sequelize-typescript";
import { Ticket } from "src/tickets/tickets.model";
export declare class Certificate extends Model {
    id: string;
    title: string;
    tickets: Ticket[];
}
