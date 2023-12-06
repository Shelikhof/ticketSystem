import { Module } from "@nestjs/common";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Ticket } from "./tickets.model";
import { TicketStudents } from "./tickets-students.model";
import { User } from "src/user/user.model";
import { Group } from "src/groups/groups.model";
import { Student } from "src/students/student.model";
import { Platform } from "src/platform/platform.model";
import { Certificate } from "src/certificates/certificates.model";

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [SequelizeModule.forFeature([Ticket, TicketStudents, User, Group, Certificate, Student, Platform])],
})
export class TicketsModule {}
