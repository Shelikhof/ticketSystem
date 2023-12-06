import { Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/createGroup.dto";
import { Group } from "./groups.model";
import { InjectModel } from "@nestjs/sequelize";
import { Student } from "src/students/student.model";
import { User } from "src/user/user.model";
import { Platform } from "src/platform/platform.model";
import { ValidationErrorException } from "src/utils/ValidationErrorException";
import { Op } from "sequelize";

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

    const students = dto.students;
    if (students && students.length > 0) {
      //check if all students is exist and free
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
      //add groupId to students
      for (const id of students) {
        const student = await this.studentRepository.findByPk(id);
        student.groupId = group.id;
        student.save();
      }
    }
    return group;
  }

  //edit group by id
  async edit(id: string, dto: CreateGroupDto) {
    const group = await this.groupRepository.findByPk(id);
    if (!group) {
      throw new ValidationErrorException("Группа не найдена");
    }

    //delete fk in old students
    const oldStudents = await this.studentRepository.findAll({ where: { groupId: group.id } });
    for (const el of oldStudents) {
      const std = await this.studentRepository.findByPk(el.id);
      std.groupId = null;
      await std.save();
    }

    const students = dto.students;
    if (students && students.length > 0) {
      //check if all students is exist and free
      for (const id of students) {
        const student = await this.studentRepository.findByPk(id);
        if (!student) {
          throw new ValidationErrorException("Студент не найден");
        }
        if (student.groupId !== null) {
          throw new ValidationErrorException(`Студент ${student.fullName} добавлен в другую группу`);
        }
      }
      //add groupId to students
      for (const id of students) {
        const student = await this.studentRepository.findByPk(id);
        student.groupId = group.id;
        student.save();
      }
    }

    await this.groupRepository.update({ curatorId: dto.curatorId, name: dto.name, platformId: dto.platformId }, { where: { id: id } });
    return;
  }

  //delete group by id
  async delete(id: string) {
    const group = await this.groupRepository.findByPk(id);
    if (!group) {
      throw new ValidationErrorException("Группа не найдена");
    }
    await group.destroy();
    return { id: id };
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
      attributes: ["id", ["name", "title"]],
    });
    if (!group) {
      throw new ValidationErrorException("Группа не найдена");
    }
    return group;
  }

  //get all groups
  async getAll() {
    const groups = await this.groupRepository.findAll();
    return groups;
  }

  async getAllWithLimit(limit: number, page: number) {
    const { count, rows } = await this.groupRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      attributes: ["id", ["name", "title"]],
    });
    return { count, page, limit, groups: rows };
  }

  async getBySearch(limit: number, page: number, searchValue: string) {
    const { count, rows } = await this.groupRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      attributes: ["id", ["name", "title"]],
      where: {
        name: {
          [Op.iLike]: `%${searchValue}%`,
        },
      },
    });
    return { count, page, limit, groups: rows };
  }

  async getGroupByCuratorId(id: string) {
    const curator = await this.userRepository.findByPk(id);
    if (!curator) {
      throw new ValidationErrorException("Куратор не найден");
    }

    const group = await this.groupRepository.findOne({
      where: {
        curatorId: id,
      },
    });
    if (!group) {
      throw new ValidationErrorException("Куратор не найден");
    }

    const groupData = await this.getById(group.id);
    return groupData;
  }
}
