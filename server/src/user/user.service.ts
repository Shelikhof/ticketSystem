import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/createUser.dto";
import { Role } from "src/roles/roles.model";
import { ValidationErrorException } from "src/utils/ValidationErrorException";
import { Platform } from "src/platform/platform.model";
import * as bcrypt from "bcryptjs";
import { Op, literal } from "sequelize";
import { EditUserDto } from "./dto/editUser.dto";
import { Group } from "src/groups/groups.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(Platform) private platformRepository: typeof Platform,
    @InjectModel(Group) private groupRepository: typeof Group
  ) {}

  //add new user
  async createUser(dto: CreateUserDto) {
    const role = await this.roleRepository.findByPk(dto.roleId);
    if (!role) {
      throw new ValidationErrorException("Роль не существует");
    }

    const platform = await this.platformRepository.findByPk(dto.platformId);
    if (!platform) {
      throw new ValidationErrorException("Площадки не существует");
    }
    const fullName = `${dto.firstName} ${dto.lastName} ${dto.surName || ""}`.trim();
    const user = await this.userRepository.create({ ...dto, fullName });
    return user;
  }

  //get user by login
  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    return user;
  }

  //get user by id
  async getById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: [
        { model: Role, as: "role" },
        { model: Platform, as: "platform" },
      ],
      attributes: ["id", "login", "firstName", "lastName", "surName", "fullName", "telNum", "password"],
    });
    if (!user) {
      throw new ValidationErrorException("Пользователь не найден");
    }
    return user;
  }

  //get users by search and role
  async getAllBySearchAndRole(searchValue: string, roleId: string, page: number, limit: number) {
    const { count, rows } = await this.userRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      where: {
        roleId: roleId,
        fullName: {
          [Op.iLike]: `%${searchValue}%`,
        },
      },
      attributes: ["id", "firstName", "lastName", "surName", "fullName"],
    });
    return { searchValue, count, page, limit, users: rows };
  }

  //get users by search
  async getAllBySearch(searchValue: string, page: number, limit: number) {
    const { count, rows } = await this.userRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      where: {
        fullName: {
          [Op.iLike]: `%${searchValue}%`,
        },
      },
      attributes: ["id", "firstName", "lastName", "surName", "fullName"],
    });
    return { searchValue, count, page, limit, users: rows };
  }

  //get users by role and platform
  async getAllByRoleAndPlatform(roleId: string, platformId: string, page: number, limit: number) {
    const { count, rows } = await this.userRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      where: {
        roleId: roleId,
        platformId: platformId,
      },
      attributes: ["id", "firstName", "lastName", "surName", "fullName"],
    });
    return { count, page, limit, users: rows };
  }

  //get all users
  async getAllWithPagination(page: number, limit: number) {
    const { count, rows } = await this.userRepository.findAndCountAll({
      limit: limit,
      offset: (page - 1) * limit,
      attributes: ["id", "firstName", "lastName", "surName", "fullName"],
    });
    return { count, page, limit, users: rows };
  }

  async getAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getTeacherBySearch(searchValue: string) {
    const role = await this.roleRepository.findOne({
      where: {
        title: "Преподаватель",
      },
    });

    const data = await this.userRepository.findAll({
      limit: 10,
      include: [
        {
          model: Group,
          required: false,
        },
      ],
      where: {
        roleId: role.id,
        fullName: {
          [Op.iLike]: `%${searchValue}%`,
        },
        "$groups.curatorId$": null,
      },
      attributes: ["id", "fullName"],
    });
    return data;
  }

  //edit user by id
  async edit(id: string, dto: EditUserDto) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new ValidationErrorException("Пользователь не найден");
    }
    const fullName = `${dto.lastName} ${dto.firstName} ${dto.surName || ""}`.trim();
    let hashPassword = "";
    if (dto?.password) {
      hashPassword = await bcrypt.hash(dto.password, Number(process.env.SALT));
    }
    if (hashPassword) {
      await this.userRepository.update({ ...dto, password: hashPassword, fullName }, { where: { id: id } });
    } else {
      await this.userRepository.update({ ...dto, fullName, password: user.password }, { where: { id: id } });
    }
    // const updatedUser = await this.getById(id);
    return { user: { id } };
  }

  //delete user by id
  async delete(id: string) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new ValidationErrorException("Пользователь не найден");
    }
    const group = await this.groupRepository.findOne({
      where: {
        curatorId: id,
      },
    });

    if (group) {
      throw new ValidationErrorException(`Пользователь куратор группы ${group.name}`);
    }
    await user.destroy();
    return user;
  }
}
