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
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const certificates_model_1 = require("./certificates.model");
const ValidationErrorException_1 = require("../utils/ValidationErrorException");
let CertificatesService = class CertificatesService {
    constructor(certificateRepository) {
        this.certificateRepository = certificateRepository;
    }
    async create(dto) {
        const candidate = await this.certificateRepository.findOne({
            where: {
                title: dto.title,
            },
        });
        if (candidate) {
            throw new ValidationErrorException_1.ValidationErrorException("Справка уже существует");
        }
        const certificate = await this.certificateRepository.create(dto);
        return certificate;
    }
    async getAll() {
        const certificates = await this.certificateRepository.findAll();
        return certificates;
    }
    async getById(id) {
        const certificate = await this.certificateRepository.findByPk(id);
        if (!certificate) {
            throw new ValidationErrorException_1.ValidationErrorException("Справка не найдена");
        }
        return certificate;
    }
    async deleteById(id) {
        const certificate = await this.getById(id);
        if (!certificate) {
            throw new ValidationErrorException_1.ValidationErrorException("Справка не найдена");
        }
        (await certificate).destroy();
        return certificate;
    }
    async editById(id, dto) {
        const certificate = await this.getById(id);
        if (!certificate) {
            throw new ValidationErrorException_1.ValidationErrorException("Справка не найдена");
        }
        await this.certificateRepository.update(dto, { where: { id: id } });
        const updateCertificate = await this.getById(id);
        return updateCertificate;
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(certificates_model_1.Certificate)),
    __metadata("design:paramtypes", [Object])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map