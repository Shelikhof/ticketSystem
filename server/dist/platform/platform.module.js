"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformModule = void 0;
const common_1 = require("@nestjs/common");
const platform_controller_1 = require("./platform.controller");
const platform_service_1 = require("./platform.service");
const sequelize_1 = require("@nestjs/sequelize");
const platform_model_1 = require("./platform.model");
let PlatformModule = class PlatformModule {
};
exports.PlatformModule = PlatformModule;
exports.PlatformModule = PlatformModule = __decorate([
    (0, common_1.Module)({
        controllers: [platform_controller_1.PlatformController],
        providers: [platform_service_1.PlatformService],
        imports: [sequelize_1.SequelizeModule.forFeature([platform_model_1.Platform])],
    })
], PlatformModule);
//# sourceMappingURL=platform.module.js.map