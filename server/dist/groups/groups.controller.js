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
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const createGroup_dto_1 = require("./dto/createGroup.dto");
const groups_service_1 = require("./groups.service");
let GroupsController = class GroupsController {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    create(dto) {
        return this.groupsService.create(dto);
    }
    edit(groupId, dto) {
        return this.groupsService.edit(groupId, dto);
    }
    delete(groupId) {
        return this.groupsService.delete(groupId);
    }
    getById(groupId) {
        return this.groupsService.getById(groupId);
    }
    getAll(query) {
        if (query.limit && query.page && query.q) {
            return this.groupsService.getBySearch(query.limit, query.page, query.q);
        }
        if (query.limit && query.page) {
            return this.groupsService.getAllWithLimit(query.limit, query.page);
        }
        if (query.curatorId) {
            return this.groupsService.getGroupByCuratorId(query.curatorId);
        }
        return this.groupsService.getAll();
    }
};
exports.GroupsController = GroupsController;
__decorate([
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createGroup_dto_1.CreateGroupDto]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:groupId"),
    __param(0, (0, common_1.Param)("groupId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createGroup_dto_1.CreateGroupDto]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)(":groupId"),
    __param(0, (0, common_1.Param)("groupId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(":groupId"),
    __param(0, (0, common_1.Param)("groupId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getAll", null);
exports.GroupsController = GroupsController = __decorate([
    (0, common_1.Controller)("groups"),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map