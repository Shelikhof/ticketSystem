import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Platform } from "src/platform/platform.model";
import { Student } from "src/students/student.model";
import { Ticket } from "src/tickets/tickets.model";
import { User } from "src/user/user.model";

interface ICreateGroup {
  name: string;
  curatorId: string;
  platformId: string;
}

@Table({ tableName: "groups" })
export class Group extends Model<Group, ICreateGroup> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  curatorId: string;

  @BelongsTo(() => User)
  curator: User;

  @ForeignKey(() => Platform)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  platformId: string;

  @BelongsTo(() => Platform)
  platform: Platform;

  @HasMany(() => Student, { onDelete: "NO ACTION" })
  students: Student[];

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
