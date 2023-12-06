import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Ticket } from "./tickets.model";
import { Platform } from "src/platform/platform.model";
import { Group } from "src/groups/groups.model";
import { CreateTicketDto } from "./dto/createTicket.dto";
import { Certificate } from "src/certificates/certificates.model";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";
import { TicketStudents } from "./tickets-students.model";
import { ValidationErrorException } from "src/utils/ValidationErrorException";
import generateTicketTitle from "src/utils/TitleGenerator";
import { ChangeStatusTicket } from "./dto/changeStatus.dto";
import { ChangeGettingStatus } from "./dto/changeGettingStatus.dto";

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket) private ticketRepository: typeof Ticket,
    @InjectModel(Platform) private platfromRepository: typeof Platform,
    @InjectModel(Group) private groupRepository: typeof Group,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Certificate) private certificateRepository: typeof Certificate,
    @InjectModel(Student) private studentRepository: typeof Student,
    @InjectModel(TicketStudents) private ticketStudentsRepository: typeof TicketStudents
  ) {}

  async create(dto: CreateTicketDto) {
    const platform = await this.platfromRepository.findByPk(dto.platformId);
    if (!platform) {
      throw new ValidationErrorException("Площадка не найден");
    }

    const group = await this.groupRepository.findByPk(dto.groupId);
    if (!group) {
      throw new ValidationErrorException("Группа не найдена");
    }

    const user = await this.userRepository.findByPk(dto.curatorId);
    if (!user) {
      throw new ValidationErrorException("Куратор не найден");
    }

    const certificate = await this.certificateRepository.findByPk(dto.certificateId);
    if (!certificate) {
      throw new ValidationErrorException("Справка не найдена");
    }

    const title = generateTicketTitle(group.name, certificate.title);

    const ticket = await this.ticketRepository.create({ ...dto, title, status: "pending" });
    if (dto.students) {
      for (const id of dto.students) {
        const student = await this.studentRepository.findByPk(id);
        await student.$add("ticket", ticket.id);
      }
    }

    return ticket;
  }

  async getById(id: string): Promise<any> {
    const ticket = await this.ticketRepository.findByPk(id, {
      include: [
        { model: User, as: "curator", attributes: ["id", "fullName"] },
        {
          model: Group,
          as: "group",
          attributes: ["id", "name"],
        },
        {
          model: Certificate,
          as: "certificate",
        },
      ],
      attributes: ["id", "title", "status"],
    });
    if (!ticket) {
      throw new ValidationErrorException("Заявка не найдена");
    }
    const ticketStudents = await this.studentRepository.findAll({
      include: [
        {
          model: Ticket,
          where: { id: id },
          through: {
            attributes: ["isGet"],
            as: "gettingStatus",
          } as { attributes: string[]; as: string },
        },
      ],
      attributes: ["id", "fullName"],
    });

    const studentsWithGettingStatus = ticketStudents.map((student) => {
      const ticket = student.tickets[0] as any;
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

  async getAllWithLimitAndStatus(status: string, limit: number, page: number) {
    const { count, rows } = await this.ticketRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      attributes: ["id", "title"],
      where: {
        status: status,
      },
    });

    return { count, page, limit, tickets: rows };
  }

  async getAllWithLimit(limit: number, page: number) {
    const { count, rows } = await this.ticketRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      attributes: ["id", "title"],
    });

    return { count, page, limit, tickets: rows };
  }

  async changeStatus(id: string, status: ChangeStatusTicket) {
    const ticket = await this.ticketRepository.findByPk(id);
    if (!ticket) {
      throw new ValidationErrorException("Заявка не найдена");
    }
    await ticket.update(status);
    return;
  }

  async changeGettingStatus(ticketId: string, studentId: string, dto: ChangeGettingStatus) {
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

  async delete(id: string) {
    const ticket = await this.ticketRepository.findByPk(id);
    if (!ticket) {
      throw new ValidationErrorException("Заявка не найдена");
    }
    await ticket.destroy();
    return;
  }
}
