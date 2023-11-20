import { Model } from "sequelize-typescript";
import { User } from "src/user/user.model";
interface ICreateRole {
    title: string;
}
export declare class Role extends Model<Role, ICreateRole> {
    id: string;
    title: string;
    users: User[];
}
export {};
