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
exports.EditUserDto = void 0;
const class_validator_1 = require("class-validator");
class EditUserDto {
}
exports.EditUserDto = EditUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "Должно быть строкой" }),
    __metadata("design:type", String)
], EditUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Должно быть строкой" }),
    __metadata("design:type", String)
], EditUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.Length)(10, 10, { message: "Длина должна быть 10 символов" }),
    __metadata("design:type", String)
], EditUserDto.prototype, "telNum", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(4, { message: "Должно быть формата UUID" }),
    __metadata("design:type", String)
], EditUserDto.prototype, "platformId", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 25, { message: "Длина должна быть от 3 до 10 символов" }),
    (0, class_validator_1.IsString)({ message: "Должно быть строкой" }),
    __metadata("design:type", String)
], EditUserDto.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(4, { message: "Должно быть формата UUID" }),
    __metadata("design:type", String)
], EditUserDto.prototype, "roleId", void 0);
//# sourceMappingURL=editUser.dto.js.map