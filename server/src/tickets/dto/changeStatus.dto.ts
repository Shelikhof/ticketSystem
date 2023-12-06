import { IsIn } from "class-validator";

export class ChangeStatusTicket {
  @IsIn(["pending", "completed", "finished"], { message: "Неверное значение" })
  readonly status: string;
}
