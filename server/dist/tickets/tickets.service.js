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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const tickets_model_1 = require("./tickets.model");
const platform_model_1 = require("../platform/platform.model");
const groups_model_1 = require("../groups/groups.model");
const certificates_model_1 = require("../certificates/certificates.model");
const student_model_1 = require("../students/student.model");
const user_model_1 = require("../user/user.model");
const tickets_students_model_1 = require("./tickets-students.model");
const ValidationErrorException_1 = require("../utils/ValidationErrorException");
const TitleGenerator_1 = require("../utils/TitleGenerator");
let TicketsService = class TicketsService {
    constructor(ticketRepository, platfromRepository, groupRepository, userRepository, certificateRepository, studentRepository, ticketStudentsRepository) {
        this.ticketRepository = ticketRepository;
        this.platfromRepository = platfromRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.certificateRepository = certificateRepository;
        this.studentRepository = studentRepository;
        this.ticketStudentsRepository = ticketStudentsRepository;
    }
    async create(dto) {
        const platform = await this.platfromRepository.findByPk(dto.platformId);
        if (!platform) {
            throw new ValidationErrorException_1.ValidationErrorException("Площадка не найден");
        }
        const group = await this.groupRepository.findByPk(dto.groupId);
        if (!group) {
            throw new ValidationErrorException_1.ValidationErrorException("Группа не найдена");
        }
        const user = await this.userRepository.findByPk(dto.curatorId);
        if (!user) {
            throw new ValidationErrorException_1.ValidationErrorException("Куратор не найден");
        }
        const certificate = await this.certificateRepository.findByPk(dto.certificateId);
        if (!certificate) {
            throw new ValidationErrorException_1.ValidationErrorException("Справка не найдена");
        }
        const title = (0, TitleGenerator_1.default)(group.name, certificate.title);
        const ticket = await this.ticketRepository.create({ ...dto, title, status: "pending" });
        if (dto.students) {
            for (const id of dto.students) {
                const student = await this.studentRepository.findByPk(id);
                await student.$add("ticket", ticket.id);
            }
        }
        return ticket;
    }
    async getById(id) {
        const ticket = await this.ticketRepository.findByPk(id, {
            include: [
                { model: user_model_1.User, as: "curator", attributes: ["id", "fullName"] },
                {
                    model: groups_model_1.Group,
                    as: "group",
                    attributes: ["id", "name"],
                },
                {
                    model: certificates_model_1.Certificate,
                    as: "certificate",
                },
            ],
            attributes: ["id", "title", "status"],
        });
        if (!ticket) {
            throw new ValidationErrorException_1.ValidationErrorException("Заявка не найдена");
        }
        const ticketStudents = await this.studentRepository.findAll({
            include: [
                {
                    model: tickets_model_1.Ticket,
                    where: { id: id },
                    through: {
                        attributes: ["isGet"],
                        as: "gettingStatus",
                    },
                },
            ],
            attributes: ["id", "fullName"],
        });
        const studentsWithGettingStatus = ticketStudents.map((student) => {
            const ticket = student.tickets[0];
            return {
                id: student.id,
                fullName: student.fullName,
                isGet: ticket?.gettingStatus?.isGet ?? false,
            };
        });
        return { ...ticket.dataValues, students: studentsWithGettingStatus };
    }
    async getAll() {
        const ticket = await this.ticketRepository.findAll({
            attributes: ["id", "title", "status"],
        });
        return ticket;
    }
    async getAllWithLimitAndStatus(status, limit, page, userId, role) {
        if (role === "Преподаватель") {
            const curator = await this.userRepository.findByPk(userId);
            const { count, rows } = await this.ticketRepository.findAndCountAll({
                limit: limit,
                offset: (page - 1) * limit,
                attributes: ["id", "title"],
                include: [
                    {
                        model: certificates_model_1.Certificate,
                        as: "certificate",
                    },
                ],
                where: {
                    status: status,
                    curatorId: curator.id,
                },
            });
            return { count, page, limit, tickets: rows };
        }
        if (role === "Менеджер") {
            const manager = await this.userRepository.findByPk(userId);
            const { count, rows } = await groups_model_1.Group.findAndCountAll({
                where: {
                    platformId: manager.platformId,
                },
                include: [
                    {
                        model: tickets_model_1.Ticket,
                        where: {
                            status: status,
                        },
                        attributes: ["id", "title", "status"],
                        include: [
                            {
                                model: certificates_model_1.Certificate,
                            },
                        ],
                    },
                ],
            });
            const tickets = rows.flatMap((group) => group.tickets);
            return { count, page, limit, tickets: tickets };
        }
        const { count, rows } = await this.ticketRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ["id", "title"],
            include: [
                {
                    model: certificates_model_1.Certificate,
                    as: "certificate",
                },
            ],
            where: {
                status: status,
            },
        });
        return { count, page, limit, tickets: rows };
    }
    async getAllWithLimit(limit, page) {
        const { count, rows } = await this.ticketRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ["id", "title"],
        });
        return { count, page, limit, tickets: rows };
    }
    async changeStatus(id, status) {
        const ticket = await this.ticketRepository.findByPk(id);
        if (!ticket) {
            throw new ValidationErrorException_1.ValidationErrorException("Заявка не найдена");
        }
        await ticket.update(status);
        return;
    }
    async changeGettingStatus(ticketId, studentId, dto) {
        const student = await this.ticketStudentsRepository.findOne({
            where: {
                ticketId,
                studentId,
            },
        });
        await student.update({ isGet: dto.status });
        await student.save();
        return;
    }
    async delete(id) {
        const ticket = await this.ticketRepository.findByPk(id);
        if (!ticket) {
            throw new ValidationErrorException_1.ValidationErrorException("Заявка не найдена");
        }
        await ticket.destroy();
        return;
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(tickets_model_1.Ticket)),
    __param(1, (0, sequelize_1.InjectModel)(platform_model_1.Platform)),
    __param(2, (0, sequelize_1.InjectModel)(groups_model_1.Group)),
    __param(3, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(4, (0, sequelize_1.InjectModel)(certificates_model_1.Certificate)),
    __param(5, (0, sequelize_1.InjectModel)(student_model_1.Student)),
    __param(6, (0, sequelize_1.InjectModel)(tickets_students_model_1.TicketStudents)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map