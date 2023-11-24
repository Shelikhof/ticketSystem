import { IsString, IsUUID, Length } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "Должно быть строкой" })
  readonly firstName: string;

  @IsString({ message: "Должно быть строкой" })
  readonly lastName: string;

  readonly surName: string;

  @Length(10, 10, { message: "Длина должна быть 10 символов" })
  readonly telNum: string;

  @IsUUID(4, { message: "Должно быть формата UUID" })
  readonly platformId: string;

  @Length(3, 25, { message: "Длина должна быть от 3 до 10 символов" })
  @IsString({ message: "Должно быть строкой" })
  readonly login: string;

  @Length(3, 25, { message: "Длина должна быть от 3 до 10 символов" })
  @IsString({ message: "Должно быть строкой" })
  readonly password: string;

  @IsUUID(4, { message: "Должно быть формата UUID" })
  readonly roleId: string;
}
