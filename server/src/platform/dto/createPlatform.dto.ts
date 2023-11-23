import { IsString, Length } from "class-validator";

export class CreatePlatformDto {
  @Length(3, 25, { message: "Длина должна быть от 3 до 25 символов" })
  @IsString({ message: "Должно быть строкой" })
  readonly title: string;
}
