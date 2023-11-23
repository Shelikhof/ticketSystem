import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";

interface ICreatePlatform {
  title: string;
}

@Table({ tableName: "platforms", createdAt: false, updatedAt: false })
export class Platform extends Model<Platform, ICreatePlatform> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Column({
    unique: true,
    type: DataType.STRING,
  })
  title: string;

  @HasMany(() => User, "platformId")
  users: User[];

  @HasMany(() => Group, "platformId")
  groups: Group[];

  @HasMany(() => Student, "platformId")
  students: Student[];
}
