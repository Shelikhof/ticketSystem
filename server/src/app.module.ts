import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { User } from "./user/user.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { AuthModule } from "./auth/auth.module";
import { PlatformModule } from "./platform/platform.module";
import { StudentsModule } from "./students/students.module";
import { GroupsModule } from "./groups/groups.module";
import { TicketsModule } from "./tickets/tickets.module";
import { CertificatesModule } from "./certificates/certificates.module";
import { Certificate } from "./certificates/certificates.model";
import { Group } from "./groups/groups.model";
import { Student } from "./students/student.model";
import { Ticket } from "./tickets/tickets.model";
import { Platform } from "./platform/platform.model";
import { TicketStudents } from "./tickets/tickets-students.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, Certificate, Group, Student, Ticket, Platform, TicketStudents],
      autoLoadModels: true,
    }),
    UserModule,
    RolesModule,
    AuthModule,
    PlatformModule,
    StudentsModule,
    GroupsModule,
    TicketsModule,
    CertificatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
