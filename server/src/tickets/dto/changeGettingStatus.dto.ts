import { IsBoolean, IsIn } from "class-validator";

export class ChangeGettingStatus {
  @IsBoolean()
  readonly status: boolean;
}
