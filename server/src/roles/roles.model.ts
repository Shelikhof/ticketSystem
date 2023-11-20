import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";

interface ICreateRole {
  title: string;
}

@Table({ tableName: "roles", createdAt: false, updatedAt: false })
export class Role extends Model<Role, ICreateRole> {
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
  title: string;

  @HasMany(() => User, "roleId")
  users: User[];
}
