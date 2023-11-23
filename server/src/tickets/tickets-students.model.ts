import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Ticket } from "./tickets.model";
import { Student } from "src/students/student.model";

@Table({ tableName: "ticket_students", createdAt: false, updatedAt: false })
export class TicketStudents extends Model<TicketStudents> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isGet: boolean;

  @ForeignKey(() => Ticket)
  @Column({ type: DataType.UUID })
  ticketId: string;

  @ForeignKey(() => Student)
  @Column({ type: DataType.UUID })
  studentId: string;
}
