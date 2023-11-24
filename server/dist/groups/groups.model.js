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
exports.Group = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const platform_model_1 = require("../platform/platform.model");
const student_model_1 = require("../students/student.model");
const tickets_model_1 = require("../tickets/tickets.model");
const user_model_1 = require("../user/user.model");
let Group = class Group extends sequelize_typescript_1.Model {
};
exports.Group = Group;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        unique: true,
    }),
    __metadata("design:type", String)
], Group.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Group.prototype, "curatorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Group.prototype, "curator", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => platform_model_1.Platform),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Group.prototype, "platformId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => platform_model_1.Platform),
    __metadata("design:type", platform_model_1.Platform)
], Group.prototype, "platform", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_model_1.Student, { onDelete: "NO ACTION" }),
    __metadata("design:type", Array)
], Group.prototype, "students", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => tickets_model_1.Ticket),
    __metadata("design:type", Array)
], Group.prototype, "tickets", void 0);
exports.Group = Group = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "groups" })
], Group);
//# sourceMappingURL=groups.model.js.map