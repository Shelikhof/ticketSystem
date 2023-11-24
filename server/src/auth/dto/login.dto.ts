import { IsString, Length } from "class-validator";

export class LoginDto {
  @Length(3, 25, { message: "Длина должна быть от 3 до 10 символов" })
  @IsString({ message: "Должно быть строкой" })
  readonly login: string;

  @Length(3, 25, { message: "Длина должна быть от 3 до 10 символов" })
  @IsString({ message: "Должно быть строкой" })
  readonly password: string;
}
