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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
const roles_service_1 = require("../roles/roles.service");
const platform_service_1 = require("../platform/platform.service");
let AuthService = class AuthService {
    constructor(platformService, userService, rolesService, jwtService) {
        this.platformService = platformService;
        this.userService = userService;
        this.rolesService = rolesService;
        this.jwtService = jwtService;
    }
    async login(userDto) {
        const user = await this.validateUser(userDto);
        const role = await this.rolesService.getById(user.roleId);
        const platform = await this.platformService.getById(user.platformId);
        const token = await this.generateToken(user, role, platform);
        return {
            token,
            user: {
                id: user.id,
                name: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                role: role.title,
            },
        };
    }
    async registration(userDto) {
        const candidate = await this.userService.getUserByLogin(userDto.login);
        if (candidate) {
            throw new common_1.HttpException("Пользователь с таким логином уже существует", common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, Number(process.env.SALT));
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        return { user: { id: user.id } };
    }
    async generateToken(user, role, platform) {
        const payload = { login: user.login, id: user.id, role: { id: role.id, title: role.title }, platform: { id: platform.id, title: platform.title } };
        return this.jwtService.sign(payload);
    }
    async validateUser(userDto) {
        const user = await this.userService.getUserByLogin(userDto.login);
        if (!user) {
            throw new common_1.HttpException("Некорректные данные", common_1.HttpStatus.BAD_REQUEST);
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new common_1.HttpException("Некорректные данные", common_1.HttpStatus.BAD_REQUEST);
    }
    async validateToken(token) {
        try {
            const payload = await this.jwtService.verify(token);
            const user = await this.userService.getById(payload.id);
            const role = await this.rolesService.getById(payload.role.id);
            const platform = await this.platformService.getById(payload.platform.id);
            const newToken = await this.generateToken(user, role, platform);
            return {
                token: newToken,
                user: {
                    name: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    role: role.title,
                },
            };
        }
        catch (e) {
            throw new common_1.HttpException("Токен невалидный", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [platform_service_1.PlatformService,
        user_service_1.UserService,
        roles_service_1.RolesService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map