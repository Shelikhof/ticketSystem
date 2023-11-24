import { IsDate, IsIn, IsString, IsUUID, Length } from "class-validator";

export class CreateStudentDto {
  @IsString({ message: "Должно быть строкой" })
  readonly firstName: string;

  @IsString({ message: "Должно быть строкой" })
  readonly lastName: string;

  readonly surName: string;

  // @IsDate({ message: "Поле должно быть датой" })
  readonly birthDate: Date;

  @IsIn(["male", "female"], { message: "Эта система толька для натуралаф." })
  readonly gender: string;

  @IsUUID(4, { message: "Должно быть формата UUID" })
  readonly platformId: string;
}
