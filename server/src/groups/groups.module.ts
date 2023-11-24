import { Module } from "@nestjs/common";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Group } from "./groups.model";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";
import { Platform } from "src/platform/platform.model";

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [SequelizeModule.forFeature([Group, Student, User, Platform])],
})
export class GroupsModule {}
