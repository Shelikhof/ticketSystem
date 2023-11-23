import { Model } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";
interface ICreatePlatform {
    title: string;
}
export declare class Platform extends Model<Platform, ICreatePlatform> {
    id: string;
    title: string;
    users: User[];
    groups: Group[];
    students: Student[];
}
export {};
