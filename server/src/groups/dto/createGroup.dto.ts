import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateGroupDto {
  @IsString({ message: "Должно быть строкой" })
  readonly name: string;

  @IsUUID(4, { message: "Должно быть формата UUID" })
  readonly platformId: string;

  @IsUUID(4, { message: "Должно быть формата UUID" })
  readonly curatorId: string;

  @IsOptional()
  @IsArray({ message: "Должно быть массивом" })
  readonly students: [string] | void;
}
