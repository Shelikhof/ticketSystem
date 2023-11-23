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
exports.CertificatesController = void 0;
const common_1 = require("@nestjs/common");
const certificates_service_1 = require("./certificates.service");
const createCertificate_dto_1 = require("./dto/createCertificate.dto");
let CertificatesController = class CertificatesController {
    constructor(certificateService) {
        this.certificateService = certificateService;
    }
    create(dto) {
        return this.certificateService.create(dto);
    }
    getAll() {
        return this.certificateService.getAll();
    }
    getById(certificateId) {
        return this.certificateService.getById(certificateId);
    }
    delete(certificateId) {
        return this.certificateService.deleteById(certificateId);
    }
    edit(certificateId, dto) {
        return this.certificateService.editById(certificateId, dto);
    }
};
exports.CertificatesController = CertificatesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCertificate_dto_1.CreateCertificateDto]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":certificateId"),
    __param(0, (0, common_1.Param)("certificateId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)(":certificateId"),
    __param(0, (0, common_1.Param)("certificateId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(":certificateId"),
    __param(0, (0, common_1.Param)("certificateId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createCertificate_dto_1.CreateCertificateDto]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "edit", null);
exports.CertificatesController = CertificatesController = __decorate([
    (0, common_1.Controller)("certificates"),
    __metadata("design:paramtypes", [certificates_service_1.CertificatesService])
], CertificatesController);
//# sourceMappingURL=certificates.controller.js.map