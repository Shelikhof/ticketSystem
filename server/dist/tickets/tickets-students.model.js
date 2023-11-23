"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketStudents = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const tickets_model_1 = require("./tickets.model");
const student_model_1 = require("../students/student.model");
let TicketStudents = class TicketStudents extends sequelize_typescript_1.Model {
};
exports.TicketStudents = TicketStudents;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        unique: true,
    }),
    __metadata("design:type", String)
], TicketStudents.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], TicketStudents.prototype, "isGet", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => tickets_model_1.Ticket),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], TicketStudents.prototype, "ticketId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => student_model_1.Student),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], TicketStudents.prototype, "studentId", void 0);
exports.TicketStudents = TicketStudents = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "ticket_students", createdAt: false, updatedAt: false })
], TicketStudents);
//# sourceMappingURL=tickets-students.model.js.map