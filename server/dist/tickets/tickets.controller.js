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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("./tickets.service");
const createTicket_dto_1 = require("./dto/createTicket.dto");
const changeStatus_dto_1 = require("./dto/changeStatus.dto");
const changeGettingStatus_dto_1 = require("./dto/changeGettingStatus.dto");
let TicketsController = class TicketsController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    create(dto) {
        return this.ticketService.create(dto);
    }
    getById(ticketId) {
        return this.ticketService.getById(ticketId);
    }
    getAll(query) {
        if (query.limit && query.page && query.status && query.userId && query.role) {
            return this.ticketService.getAllWithLimitAndStatus(query.status, query.limit, query.page, query.userId, query.role);
        }
        if (query.limit && query.page) {
            return this.ticketService.getAllWithLimit(query.limit, query.page);
        }
        return this.ticketService.getAll();
    }
    changeStatus(ticketId, dto) {
        return this.ticketService.changeStatus(ticketId, dto);
    }
    changeStudentStatus(ticketId, studentId, dto) {
        return this.ticketService.changeGettingStatus(ticketId, studentId, dto);
    }
    delete(ticketId) {
        return this.ticketService.delete(ticketId);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTicket_dto_1.CreateTicketDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/:ticketId"),
    __param(0, (0, common_1.Param)("ticketId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Put)("/:ticketId/status"),
    __param(0, (0, common_1.Param)("ticketId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, changeStatus_dto_1.ChangeStatusTicket]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Put)("/:ticketId/studentStatus/:studentId"),
    __param(0, (0, common_1.Param)("ticketId")),
    __param(1, (0, common_1.Param)("studentId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, changeGettingStatus_dto_1.ChangeGettingStatus]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "changeStudentStatus", null);
__decorate([
    (0, common_1.Delete)(":ticketId"),
    __param(0, (0, common_1.Param)("ticketId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "delete", null);
exports.TicketsController = TicketsController = __decorate([
    (0, common_1.Controller)("tickets"),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map