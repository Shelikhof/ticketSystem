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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const groups_model_1 = require("./groups.model");
const sequelize_1 = require("@nestjs/sequelize");
const student_model_1 = require("../students/student.model");
const user_model_1 = require("../user/user.model");
const platform_model_1 = require("../platform/platform.model");
const ValidationErrorException_1 = require("../utils/ValidationErrorException");
const sequelize_2 = require("sequelize");
let GroupsService = class GroupsService {
    constructor(studentRepository, groupRepository, userRepository, platformRepository) {
        this.studentRepository = studentRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.platformRepository = platformRepository;
    }
    async create(dto) {
        const candidate = await this.groupRepository.findOne({ where: { name: dto.name } });
        if (candidate) {
            throw new ValidationErrorException_1.ValidationErrorException("Название занято");
        }
        const platform = await this.platformRepository.findByPk(dto.platformId);
        if (!platform) {
            throw new ValidationErrorException_1.ValidationErrorException("Площадка не найдена");
        }
        const curator = await this.userRepository.findByPk(dto.curatorId);
        if (!curator) {
            throw new ValidationErrorException_1.ValidationErrorException("Куратор не найден");
        }
        const group = await this.groupRepository.create(dto);
        const students = dto.students;
        if (students && students.length > 0) {
            for (const id of students) {
                const student = await this.studentRepository.findByPk(id);
                if (!student) {
                    group.destroy();
                    throw new ValidationErrorException_1.ValidationErrorException("Студент не найден");
                }
                if (student.groupId !== null) {
                    group.destroy();
                    throw new ValidationErrorException_1.ValidationErrorException(`Студент ${student.fullName} добавлен в другую группу`);
                }
            }
            for (const id of students) {
                const student = await this.studentRepository.findByPk(id);
                student.groupId = group.id;
                student.save();
            }
        }
        return group;
    }
    async edit(id, dto) {
        const group = await this.groupRepository.findByPk(id);
        if (!group) {
            throw new ValidationErrorException_1.ValidationErrorException("Группа не найдена");
        }
        const oldStudents = await this.studentRepository.findAll({ where: { groupId: group.id } });
        for (const el of oldStudents) {
            const std = await this.studentRepository.findByPk(el.id);
            std.groupId = null;
            await std.save();
        }
        const students = dto.students;
        if (students && students.length > 0) {
            for (const id of students) {
                const student = await this.studentRepository.findByPk(id);
                if (!student) {
                    throw new ValidationErrorException_1.ValidationErrorException("Студент не найден");
                }
                if (student.groupId !== null) {
                    throw new ValidationErrorException_1.ValidationErrorException(`Студент ${student.fullName} добавлен в другую группу`);
                }
            }
            for (const id of students) {
                const student = await this.studentRepository.findByPk(id);
                student.groupId = group.id;
                student.save();
            }
        }
        await this.groupRepository.update({ curatorId: dto.curatorId, name: dto.name, platformId: dto.platformId }, { where: { id: id } });
        return;
    }
    async delete(id) {
        const group = await this.groupRepository.findByPk(id);
        if (!group) {
            throw new ValidationErrorException_1.ValidationErrorException("Группа не найдена");
        }
        await group.destroy();
        return { id: id };
    }
    async getById(id) {
        const group = await this.groupRepository.findOne({
            where: { id },
            include: [
                { model: student_model_1.Student, as: "students", attributes: ["id", "fullName"] },
                { model: user_model_1.User, as: "curator", attributes: ["id", "fullName"] },
                { model: platform_model_1.Platform, as: "platform" },
            ],
            attributes: ["id", ["name", "title"]],
        });
        if (!group) {
            throw new ValidationErrorException_1.ValidationErrorException("Группа не найдена");
        }
        return group;
    }
    async getAll() {
        const groups = await this.groupRepository.findAll();
        return groups;
    }
    async getAllWithLimit(limit, page) {
        const { count, rows } = await this.groupRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ["id", ["name", "title"]],
        });
        return { count, page, limit, groups: rows };
    }
    async getBySearch(limit, page, searchValue) {
        const { count, rows } = await this.groupRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ["id", ["name", "title"]],
            where: {
                name: {
                    [sequelize_2.Op.iLike]: `%${searchValue}%`,
                },
            },
        });
        return { count, page, limit, groups: rows };
    }
    async getGroupByCuratorId(id) {
        const curator = await this.userRepository.findByPk(id);
        if (!curator) {
            throw new ValidationErrorException_1.ValidationErrorException("Куратор не найден");
        }
        const group = await this.groupRepository.findOne({
            where: {
                curatorId: id,
            },
        });
        if (!group) {
            throw new ValidationErrorException_1.ValidationErrorException("Куратор не найден");
        }
        const groupData = await this.getById(group.id);
        return groupData;
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(student_model_1.Student)),
    __param(1, (0, sequelize_1.InjectModel)(groups_model_1.Group)),
    __param(2, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(3, (0, sequelize_1.InjectModel)(platform_model_1.Platform)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], GroupsService);
//# sourceMappingURL=groups.service.js.map