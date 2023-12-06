import { Model } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { Platform } from "src/platform/platform.model";
import { Role } from "src/roles/roles.model";
import { Ticket } from "src/tickets/tickets.model";
interface ICreateUser {
    firstName: string;
    lastName: string;
    surName: string;
    fullName: string;
    telNum: string;
    platformId: string;
    login: string;
    password: string;
    roleId: string;
}
export declare class User extends Model<User, ICreateUser> {
    id: string;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    surName: string;
    fullName: string;
    telNum: string;
    platformId: string;
    platform: Platform;
    roleId: string;
    role: Role;
    groups: Group;
    tickets: Ticket[];
}
export {};
