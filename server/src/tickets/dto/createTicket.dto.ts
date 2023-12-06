import { IsArray, IsOptional, IsUUID } from "class-validator";

export class CreateTicketDto {
  @IsUUID(4, { message: "Должно быть формата UUID" })
  readonly platformId: string;

  @IsUUID(4, { message: "Должно быть формата UUID" })
  readonly groupId: string;

  @IsUUID(4, { message: "Должно быть формата UUID" })
  readonly curatorId: string;

  @IsUUID(4, { message: "Должно быть формата UUID" })
  readonly certificateId: string;

  @IsOptional()
  @IsArray({ message: "Должно быть массивом" })
  readonly students: string[];
}
