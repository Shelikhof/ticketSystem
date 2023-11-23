import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Ticket } from "src/tickets/tickets.model";

interface ICreateCertificate {
  title: string;
}

@Table({ tableName: "certificates", createdAt: false, updatedAt: false })
export class Certificate extends Model {
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

  @HasMany(() => Ticket, "certificateId")
  tickets: Ticket[];
}
