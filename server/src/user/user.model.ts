import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
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

@Table({ tableName: "users" })
export class User extends Model<User, ICreateUser> {
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
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

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
    type: DataType.STRING,
  })
  telNum: string;

  @ForeignKey(() => Platform)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  platformId: string;

  @BelongsTo(() => Platform)
  platform: Platform;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roleId: string;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Group, { onDelete: "NO ACTION", as: "curatorId" })
  groups: Group[];

  @HasMany(() => Ticket, "curatorId")
  tickets: Ticket[];
}
