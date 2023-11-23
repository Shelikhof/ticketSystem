import { Model } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { Platform } from "src/platform/platform.model";
import { Ticket } from "src/tickets/tickets.model";
interface ICreateStudent {
    firstName: string;
    lastName: string;
    surName: string;
    birthDate: Date;
    gender: string;
    groupId: string;
    platformId: string;
}
export declare class Student extends Model<Student, ICreateStudent> {
    id: string;
    firstName: string;
    lastName: string;
    surName: string;
    birthDate: Date;
    gender: string;
    registrNum: string;
    groupId: string;
    group: Group;
    platformId: string;
    platform: Platform;
    tickets: Ticket[];
}
export {};
