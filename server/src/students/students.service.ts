import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Student } from "./student.model";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { Platform } from "src/platform/platform.model";
import { ValidationErrorException } from "src/utils/ValidationErrorException";
import { Group } from "src/groups/groups.model";
import { Op } from "sequelize";

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    @InjectModel(Platform) private platformRepository: typeof Platform
  ) {}

  //create students
  async create(dto: CreateStudentDto) {
    const platform = await this.platformRepository.findByPk(dto.platformId);
    if (!platform) {
      throw new ValidationErrorException("Площадки не существует");
    }
    const fullName = `${dto.lastName} ${dto.firstName} ${dto.surName || ""}`.trim();
    const student = await this.studentRepository.create({ ...dto, fullName });
    return { student: { id: student.id } };
  }

  //edit student by id
  async edit(id: string, dto: CreateStudentDto) {
    const student = await this.studentRepository.findByPk(id);
    if (!student) {
      throw new ValidationErrorException("Студент не найден");
    }
    const fullName = `${dto.lastName} ${dto.firstName} ${dto.surName || ""}`.trim();
    await this.studentRepository.update({ ...dto, fullName }, { where: { id: id } });
    return { student: { id: student.id } };
  }

  //get student by id
  async getById(id: string) {
    const student = await this.studentRepository.findOne({
      where: { id },
      include: [
        {
          model: Group,
          as: "group",
          attributes: ["id", "name"],
        },
        {
          model: Platform,
          as: "platform",
        },
      ],
      attributes: ["id", "firstName", "lastName", "surName", "fullName", "birthDate", "gender"],
    });
    if (!student) {
      throw new ValidationErrorException("Студент не найден");
    }
    return student;
  }

  //delete student by id
  async delete(id: string) {
    const student = await this.studentRepository.findByPk(id);
    if (!student) {
      throw new ValidationErrorException("Студент не найден");
    }
    student.destroy();
    return { student: { id } };
  }

  //get all students
  async getAll() {
    const students = await this.studentRepository.findAll({
      include: [
        {
          model: Group,
          as: "group",
        },
      ],
    });
    return students;
  }

  //get all students with count limit
  async getAllWithLimit(page: number, limit: number) {
    const { count, rows } = await this.studentRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      attributes: ["id", "fullName"],
    });
    return { count, page, limit, students: rows };
  }

  //get students by search
  async getBySearch(page: number, limit: number, searchValue: string) {
    const { count, rows } = await this.studentRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      attributes: ["id", "fullName"],
      where: {
        fullName: {
          [Op.iLike]: `%${searchValue}%`,
        },
      },
    });
    return { count, page, limit, students: rows };
  }

  async getFreeStudents(searchValue: string) {
    const data = await this.studentRepository.findAll({
      limit: 10,
      where: {
        fullName: {
          [Op.iLike]: `%${searchValue}%`,
        },
        groupId: null,
      },
      attributes: ["fullName", "id"],
    });
    return data;
  }
}
