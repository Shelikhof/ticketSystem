import { Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/createGroup.dto";
import { Group } from "./groups.model";
import { InjectModel } from "@nestjs/sequelize";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";
import { Platform } from "src/platform/platform.model";
import { ValidationErrorException } from "src/utils/ValidationErrorException";

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    @InjectModel(Group) private groupRepository: typeof Group,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Platform) private platformRepository: typeof Platform
  ) {}

  //create group
  async create(dto: CreateGroupDto) {
    const candidate = await this.groupRepository.findOne({ where: { name: dto.name } });
    if (candidate) {
      throw new ValidationErrorException("Название занято");
    }
    const platform = await this.platformRepository.findByPk(dto.platformId);
    if (!platform) {
      throw new ValidationErrorException("Площадка не найдена");
    }
    const curator = await this.userRepository.findByPk(dto.curatorId);
    if (!curator) {
      throw new ValidationErrorException("Куратор не найден");
    }
    const group = await this.groupRepository.create(dto);

    const students = dto.studentsId;
    for (const id of students) {
      const student = await this.studentRepository.findByPk(id);
      if (!student) {
        group.destroy();
        throw new ValidationErrorException("Студент не найден");
      }
      if (student.groupId !== null) {
        group.destroy();
        throw new ValidationErrorException(`Студент ${student.fullName} добавлен в другую группу`);
      }
    }
    for (const id of students) {
      const student = await this.studentRepository.findByPk(id);
      student.groupId = group.id;
      student.save();
    }
    return group;
  }

  //edit group by id
  async edit() {}

  //delete group by id
  async delete(id: string) {
    const group = await this.groupRepository.findByPk(id);
    if (!group) {
      throw new ValidationErrorException("Группа не найдена");
    }
    group.destroy();
    return { group: { id } };
  }

  //get group by id
  async getById(id: string) {
    const group = await this.groupRepository.findOne({
      where: { id },
      include: [
        { model: Student, as: "students", attributes: ["id", "fullName"] },
        { model: User, as: "curator", attributes: ["id", "fullName"] },
        { model: Platform, as: "platform" },
      ],
      attributes: ["id", "name"],
    });
    if (!group) {
      throw new ValidationErrorException("Группа не найдена");
    }
    return { group };
  }

  //get all groups
  async getAll() {
    const groups = await this.groupRepository.findAll();
    return groups;
  }
}
