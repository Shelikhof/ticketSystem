import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Certificate } from "src/certificates/certificates.model";
import { Group } from "src/groups/groups.model";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";
import { TicketStudents } from "./tickets-students.model";

interface ICreateTicket {
  groupId: string;
  certificateId: string;
  curatorId: string;
  title: string;
  status: string;
}

@Table({ tableName: "tickets" })
export class Ticket extends Model<Ticket, ICreateTicket> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  groupId: string;

  @BelongsTo(() => Group)
  group: Group;

  @ForeignKey(() => Certificate)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  certificateId: string;

  @BelongsTo(() => Certificate)
  certificate: Certificate;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  curatorId: string;

  @BelongsTo(() => User)
  curator: User;

  @BelongsToMany(() => Student, () => TicketStudents)
  students: Student[];
}
