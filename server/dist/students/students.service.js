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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const student_model_1 = require("./student.model");
const platform_model_1 = require("../platform/platform.model");
const ValidationErrorException_1 = require("../utils/ValidationErrorException");
const groups_model_1 = require("../groups/groups.model");
let StudentsService = class StudentsService {
    constructor(studentRepository, platformRepository) {
        this.studentRepository = studentRepository;
        this.platformRepository = platformRepository;
    }
    async create(dto) {
        const platform = await this.platformRepository.findByPk(dto.platformId);
        if (!platform) {
            throw new ValidationErrorException_1.ValidationErrorException("Площадки не существует");
        }
        const fullName = `${dto.firstName} ${dto.lastName} ${dto.surName || ""}`.trim();
        const student = await this.studentRepository.create({ ...dto, fullName });
        return { student: { id: student.id } };
    }
    async edit(id, dto) {
        const student = await this.studentRepository.findByPk(id);
        if (!student) {
            throw new ValidationErrorException_1.ValidationErrorException("Студент не найден");
        }
        await this.studentRepository.update(dto, { where: { id: id } });
        return { student: { id: student.id } };
    }
    async getById(id) {
        const student = await this.studentRepository.findOne({
            where: { id },
            include: [
                {
                    model: groups_model_1.Group,
                    as: "group",
                    attributes: ["id", "name"],
                },
            ],
        });
        if (!student) {
            throw new ValidationErrorException_1.ValidationErrorException("Студент не найден");
        }
        return student;
    }
    async delete(id) {
        const student = await this.studentRepository.findByPk(id);
        if (!student) {
            throw new ValidationErrorException_1.ValidationErrorException("Студент не найден");
        }
        student.destroy();
        return { student: { id } };
    }
    async getAll() {
        const students = await this.studentRepository.findAll({
            include: [
                {
                    model: groups_model_1.Group,
                    as: "group",
                },
            ],
        });
        return students;
    }
    async getAllWithLimit(page, limit) {
        const { count, rows } = await this.studentRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ["id", "fullName"],
        });
        return { count, page, limit, students: rows };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(student_model_1.Student)),
    __param(1, (0, sequelize_1.InjectModel)(platform_model_1.Platform)),
    __metadata("design:paramtypes", [Object, Object])
], StudentsService);
//# sourceMappingURL=students.service.js.map