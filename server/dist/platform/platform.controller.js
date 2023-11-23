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
exports.PlatformController = void 0;
const common_1 = require("@nestjs/common");
const platform_service_1 = require("./platform.service");
const createPlatform_dto_1 = require("./dto/createPlatform.dto");
let PlatformController = class PlatformController {
    constructor(platformService) {
        this.platformService = platformService;
    }
    create(dto) {
        return this.platformService.create(dto);
    }
    getAll() {
        return this.platformService.getAll();
    }
    getById(platformId) {
        return this.platformService.getById(platformId);
    }
    delete(platformId) {
        return this.platformService.deleteById(platformId);
    }
    edit(platformId, dto) {
        return this.platformService.editById(platformId, dto);
    }
};
exports.PlatformController = PlatformController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPlatform_dto_1.CreatePlatformDto]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":platformId"),
    __param(0, (0, common_1.Param)("platformId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)(":platformId"),
    __param(0, (0, common_1.Param)("platformId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(":platformId"),
    __param(0, (0, common_1.Param)("platformId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createPlatform_dto_1.CreatePlatformDto]),
    __metadata("design:returntype", void 0)
], PlatformController.prototype, "edit", null);
exports.PlatformController = PlatformController = __decorate([
    (0, common_1.Controller)("platform"),
    __metadata("design:paramtypes", [platform_service_1.PlatformService])
], PlatformController);
//# sourceMappingURL=platform.controller.js.map