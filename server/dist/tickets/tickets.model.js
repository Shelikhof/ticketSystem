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
exports.Ticket = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const certificates_model_1 = require("../certificates/certificates.model");
const groups_model_1 = require("../groups/groups.model");
const student_model_1 = require("../students/student.model");
const user_model_1 = require("../user/user.model");
const tickets_students_model_1 = require("./tickets-students.model");
let Ticket = class Ticket extends sequelize_typescript_1.Model {
};
exports.Ticket = Ticket;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        unique: true,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => groups_model_1.Group),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "groupId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => groups_model_1.Group),
    __metadata("design:type", groups_model_1.Group)
], Ticket.prototype, "group", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => certificates_model_1.Certificate),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "certificateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => certificates_model_1.Certificate),
    __metadata("design:type", certificates_model_1.Certificate)
], Ticket.prototype, "certificate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "curatorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Ticket.prototype, "curator", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => student_model_1.Student, () => tickets_students_model_1.TicketStudents),
    __metadata("design:type", Array)
], Ticket.prototype, "students", void 0);
exports.Ticket = Ticket = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "tickets" })
], Ticket);
//# sourceMappingURL=tickets.model.js.map