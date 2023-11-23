import { Model } from "sequelize-typescript";
import { Platform } from "src/platform/platform.model";
import { Student } from "src/students/student.model";
import { Ticket } from "src/tickets/tickets.model";
import { User } from "src/user/user.model";
interface ICreateGroup {
    name: string;
    curatorId: string;
    platformId: string;
}
export declare class Group extends Model<Group, ICreateGroup> {
    id: string;
    name: string;
    curatorId: string;
    curator: User;
    platformId: string;
    platform: Platform;
    students: Student[];
    tickets: Ticket[];
}
export {};
