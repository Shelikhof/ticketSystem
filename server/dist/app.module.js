"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const user_model_1 = require("./user/user.model");
const roles_module_1 = require("./roles/roles.module");
const roles_model_1 = require("./roles/roles.model");
const auth_module_1 = require("./auth/auth.module");
const platform_module_1 = require("./platform/platform.module");
const students_module_1 = require("./students/students.module");
const groups_module_1 = require("./groups/groups.module");
const tickets_module_1 = require("./tickets/tickets.module");
const certificates_module_1 = require("./certificates/certificates.module");
const certificates_model_1 = require("./certificates/certificates.model");
const groups_model_1 = require("./groups/groups.model");
const student_model_1 = require("./students/student.model");
const tickets_model_1 = require("./tickets/tickets.model");
const platform_model_1 = require("./platform/platform.model");
const tickets_students_model_1 = require("./tickets/tickets-students.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRESS_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [user_model_1.User, roles_model_1.Role, certificates_model_1.Certificate, groups_model_1.Group, student_model_1.Student, tickets_model_1.Ticket, platform_model_1.Platform, tickets_students_model_1.TicketStudents],
                autoLoadModels: true,
            }),
            user_module_1.UserModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            platform_module_1.PlatformModule,
            students_module_1.StudentsModule,
            groups_module_1.GroupsModule,
            tickets_module_1.TicketsModule,
            certificates_module_1.CertificatesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map