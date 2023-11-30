import { IsString, Length } from "class-validator";

export class CreateCertificateDto {
  @Length(3, 50, { message: "Длина должна быть от 3 до 50 символов" })
  @IsString({ message: "Должно быть строкой" })
  readonly title: string;
}
