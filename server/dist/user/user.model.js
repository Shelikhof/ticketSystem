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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const groups_model_1 = require("../groups/groups.model");
const platform_model_1 = require("../platform/platform.model");
const roles_model_1 = require("../roles/roles.model");
const tickets_model_1 = require("../tickets/tickets.model");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], User.prototype, "surName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], User.prototype, "telNum", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => platform_model_1.Platform),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "platformId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => platform_model_1.Platform),
    __metadata("design:type", platform_model_1.Platform)
], User.prototype, "platform", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => roles_model_1.Role),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "roleId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => roles_model_1.Role),
    __metadata("design:type", roles_model_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => groups_model_1.Group, { onDelete: "NO ACTION", foreignKey: "curatorId" }),
    __metadata("design:type", groups_model_1.Group)
], User.prototype, "groups", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => tickets_model_1.Ticket, "curatorId"),
    __metadata("design:type", Array)
], User.prototype, "tickets", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "users" })
], User);
//# sourceMappingURL=user.model.js.map