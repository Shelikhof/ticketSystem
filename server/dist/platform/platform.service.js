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
exports.PlatformService = void 0;
const common_1 = require("@nestjs/common");
const ValidationErrorException_1 = require("../utils/ValidationErrorException");
const platform_model_1 = require("./platform.model");
const sequelize_1 = require("@nestjs/sequelize");
let PlatformService = class PlatformService {
    constructor(platformRepository) {
        this.platformRepository = platformRepository;
    }
    async create(dto) {
        const candidate = await this.platformRepository.findOne({
            where: {
                title: dto.title,
            },
        });
        if (candidate) {
            throw new ValidationErrorException_1.ValidationErrorException("Площадка уже существует");
        }
        const platform = await this.platformRepository.create(dto);
        return platform;
    }
    async getAll() {
        const platforms = await this.platformRepository.findAll();
        return platforms;
    }
    async getById(id) {
        const platform = await this.platformRepository.findByPk(id);
        if (!platform) {
            throw new ValidationErrorException_1.ValidationErrorException("Платформа не найдена");
        }
        return platform;
    }
    async deleteById(id) {
        const platform = await this.getById(id);
        if (!platform) {
            throw new ValidationErrorException_1.ValidationErrorException("Платформа не найдена");
        }
        (await platform).destroy();
        return platform;
    }
    async editById(id, dto) {
        const platform = await this.getById(id);
        if (!platform) {
            throw new ValidationErrorException_1.ValidationErrorException("Платформа не найдена");
        }
        await this.platformRepository.update(dto, { where: { id: id } });
        const updatedPlatform = await this.getById(id);
        return updatedPlatform;
    }
};
exports.PlatformService = PlatformService;
exports.PlatformService = PlatformService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(platform_model_1.Platform)),
    __metadata("design:paramtypes", [Object])
], PlatformService);
//# sourceMappingURL=platform.service.js.map