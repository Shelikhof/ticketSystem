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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("./user.model");
const sequelize_1 = require("@nestjs/sequelize");
const roles_model_1 = require("../roles/roles.model");
const ValidationErrorException_1 = require("../utils/ValidationErrorException");
const platform_model_1 = require("../platform/platform.model");
const bcrypt = require("bcryptjs");
const sequelize_2 = require("sequelize");
const groups_model_1 = require("../groups/groups.model");
let UserService = class UserService {
    constructor(userRepository, roleRepository, platformRepository, groupRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.platformRepository = platformRepository;
        this.groupRepository = groupRepository;
    }
    async createUser(dto) {
        const role = await this.roleRepository.findByPk(dto.roleId);
        if (!role) {
            throw new ValidationErrorException_1.ValidationErrorException("Роль не существует");
        }
        const platform = await this.platformRepository.findByPk(dto.platformId);
        if (!platform) {
            throw new ValidationErrorException_1.ValidationErrorException("Площадки не существует");
        }
        const fullName = `${dto.firstName} ${dto.lastName} ${dto.surName || ""}`.trim();
        const user = await this.userRepository.create({ ...dto, fullName });
        return user;
    }
    async getUserByLogin(login) {
        const user = await this.userRepository.findOne({ where: { login } });
        return user;
    }
    async getById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            include: [
                { model: roles_model_1.Role, as: "role" },
                { model: platform_model_1.Platform, as: "platform" },
            ],
            attributes: ["id", "login", "firstName", "lastName", "surName", "fullName", "telNum", "password"],
        });
        if (!user) {
            throw new ValidationErrorException_1.ValidationErrorException("Пользователь не найден");
        }
        return user;
    }
    async getAllBySearchAndRole(searchValue, roleId, page, limit) {
        const { count, rows } = await this.userRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            where: {
                roleId: roleId,
                fullName: {
                    [sequelize_2.Op.iLike]: `%${searchValue}%`,
                },
            },
            attributes: ["id", "firstName", "lastName", "surName", "fullName"],
        });
        return { searchValue, count, page, limit, users: rows };
    }
    async getAllBySearch(searchValue, page, limit) {
        const { count, rows } = await this.userRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            where: {
                fullName: {
                    [sequelize_2.Op.iLike]: `%${searchValue}%`,
                },
            },
            attributes: ["id", "firstName", "lastName", "surName", "fullName"],
        });
        return { searchValue, count, page, limit, users: rows };
    }
    async getAllByRoleAndPlatform(roleId, platformId, page, limit) {
        const { count, rows } = await this.userRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            where: {
                roleId: roleId,
                platformId: platformId,
            },
            attributes: ["id", "firstName", "lastName", "surName", "fullName"],
        });
        return { count, page, limit, users: rows };
    }
    async getAllWithPagination(page, limit) {
        const { count, rows } = await this.userRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ["id", "firstName", "lastName", "surName", "fullName"],
        });
        return { count, page, limit, users: rows };
    }
    async getAll() {
        const users = await this.userRepository.findAll();
        return users;
    }
    async getTeacherBySearch(searchValue) {
        const role = await this.roleRepository.findOne({
            where: {
                title: "Преподаватель",
            },
        });
        const data = await this.userRepository.findAll({
            limit: 10,
            include: [
                {
                    model: groups_model_1.Group,
                    required: false,
                },
            ],
            where: {
                roleId: role.id,
                fullName: {
                    [sequelize_2.Op.iLike]: `%${searchValue}%`,
                },
                "$groups.curatorId$": null,
            },
            attributes: ["id", "fullName"],
        });
        return data;
    }
    async edit(id, dto) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new ValidationErrorException_1.ValidationErrorException("Пользователь не найден");
        }
        const fullName = `${dto.lastName} ${dto.firstName} ${dto.surName || ""}`.trim();
        let hashPassword = "";
        if (dto?.password) {
            hashPassword = await bcrypt.hash(dto.password, Number(process.env.SALT));
        }
        if (hashPassword) {
            await this.userRepository.update({ ...dto, password: hashPassword, fullName }, { where: { id: id } });
        }
        else {
            await this.userRepository.update({ ...dto, fullName, password: user.password }, { where: { id: id } });
        }
        return { user: { id } };
    }
    async delete(id) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new ValidationErrorException_1.ValidationErrorException("Пользователь не найден");
        }
        const group = await this.groupRepository.findOne({
            where: {
                curatorId: id,
            },
        });
        if (group) {
            throw new ValidationErrorException_1.ValidationErrorException(`Пользователь куратор группы ${group.name}`);
        }
        await user.destroy();
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(roles_model_1.Role)),
    __param(2, (0, sequelize_1.InjectModel)(platform_model_1.Platform)),
    __param(3, (0, sequelize_1.InjectModel)(groups_model_1.Group)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], UserService);
//# sourceMappingURL=user.service.js.map