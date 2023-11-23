import { Model } from "sequelize-typescript";
import { Certificate } from "src/certificates/certificates.model";
import { Group } from "src/groups/groups.model";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";
interface ICreateTicket {
    groupId: string;
    certificateId: string;
    curatorId: string;
    title: string;
    status: string;
}
export declare class Ticket extends Model<Ticket, ICreateTicket> {
    id: string;
    title: string;
    status: string;
    groupId: string;
    group: Group;
    certificateId: string;
    certificate: Certificate;
    curatorId: string;
    curator: User;
    students: Student[];
}
export {};
