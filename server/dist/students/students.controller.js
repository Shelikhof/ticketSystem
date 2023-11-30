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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("./students.service");
const createStudent_dto_1 = require("./dto/createStudent.dto");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    create(dto) {
        return this.studentsService.create(dto);
    }
    edit(studentId, dto) {
        return this.studentsService.edit(studentId, dto);
    }
    delete(studentId) {
        return this.studentsService.delete(studentId);
    }
    getById(studentId) {
        return this.studentsService.getById(studentId);
    }
    getAll(query) {
        if (query.page && query.limit) {
            return this.studentsService.getAllWithLimit(query.page, query.limit);
        }
        return this.studentsService.getAll();
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Post)("/add"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createStudent_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/edit/:studentId"),
    __param(0, (0, common_1.Param)("studentId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createStudent_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)("/:studentId"),
    __param(0, (0, common_1.Param)("studentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("/:studentId"),
    __param(0, (0, common_1.Param)("studentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getAll", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)("students"),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map