import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { Platform } from "src/platform/platform.model";
import { TicketStudents } from "src/tickets/tickets-students.model";
import { Ticket } from "src/tickets/tickets.model";

interface ICreateStudent {
  firstName: string;
  lastName: string;
  surName: string;
  fullName: string;
  birthDate: Date;
  gender: string;
  groupId: string;
  platformId: string;
}

@Table({ tableName: "students" })
export class Student extends Model<Student, ICreateStudent> {
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
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  surName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate: Date;

  @Column({
    type: DataType.STRING,
    defaultValue: "male",
  })
  gender: string;

  @Column({
    type: DataType.STRING,
  })
  registrNum: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    onDelete: "SET NULL",
  })
  groupId: string;

  @BelongsTo(() => Group)
  group: Group;

  @ForeignKey(() => Platform)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  platformId: string;

  @BelongsTo(() => Platform)
  platform: Platform;

  @BelongsToMany(() => Ticket, () => TicketStudents)
  tickets: Ticket[];
}
