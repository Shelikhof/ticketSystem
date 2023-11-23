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
exports.Platform = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const groups_model_1 = require("../groups/groups.model");
const student_model_1 = require("../students/student.model");
const user_model_1 = require("../user/user.model");
let Platform = class Platform extends sequelize_typescript_1.Model {
};
exports.Platform = Platform;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        unique: true,
    }),
    __metadata("design:type", String)
], Platform.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        unique: true,
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Platform.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_model_1.User, "platformId"),
    __metadata("design:type", Array)
], Platform.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => groups_model_1.Group, "platformId"),
    __metadata("design:type", Array)
], Platform.prototype, "groups", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_model_1.Student, "platformId"),
    __metadata("design:type", Array)
], Platform.prototype, "students", void 0);
exports.Platform = Platform = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "platforms", createdAt: false, updatedAt: false })
], Platform);
//# sourceMappingURL=platform.model.js.map