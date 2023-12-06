import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Student } from "./student.model";
import { Platform } from "src/platform/platform.model";
import { User } from "src/user/user.model";
import { Group } from "src/groups/groups.model";

@Module({
  providers: [StudentsService],
  controllers: [StudentsController],
  imports: [SequelizeModule.forFeature([Student, Platform, User, Group])],
})
export class StudentsModule {}
