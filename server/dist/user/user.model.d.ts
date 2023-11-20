import { Model } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
interface ICreateUser {
    login: string;
    password: string;
    role: string;
}
export declare class User extends Model<User, ICreateUser> {
    id: string;
    login: string;
    password: string;
    roleId: string;
    role: Role;
}
export {};
