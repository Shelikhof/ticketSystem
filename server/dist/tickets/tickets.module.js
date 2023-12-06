"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsModule = void 0;
const common_1 = require("@nestjs/common");
const tickets_controller_1 = require("./tickets.controller");
const tickets_service_1 = require("./tickets.service");
const sequelize_1 = require("@nestjs/sequelize");
const tickets_model_1 = require("./tickets.model");
const tickets_students_model_1 = require("./tickets-students.model");
const user_model_1 = require("../user/user.model");
const groups_model_1 = require("../groups/groups.model");
const student_model_1 = require("../students/student.model");
const platform_model_1 = require("../platform/platform.model");
const certificates_model_1 = require("../certificates/certificates.model");
let TicketsModule = class TicketsModule {
};
exports.TicketsModule = TicketsModule;
exports.TicketsModule = TicketsModule = __decorate([
    (0, common_1.Module)({
        controllers: [tickets_controller_1.TicketsController],
        providers: [tickets_service_1.TicketsService],
        imports: [sequelize_1.SequelizeModule.forFeature([tickets_model_1.Ticket, tickets_students_model_1.TicketStudents, user_model_1.User, groups_model_1.Group, certificates_model_1.Certificate, student_model_1.Student, platform_model_1.Platform])],
    })
], TicketsModule);
//# sourceMappingURL=tickets.module.js.map