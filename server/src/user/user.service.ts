import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/createUser.dto";
import { Role } from "src/roles/roles.model";
import { ValidationErrorException } from "src/utils/ValidationErrorException";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Role) private roleRepository: typeof Role
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsersByRole(roleTitle: string) {
    const role = await Role.findOne({ where: { title: roleTitle } });
    if (!role) {
      throw new ValidationErrorException("Role doesnt exist");
    }
    const users = await User.findAll({
      where: { roleId: role.id },
      attributes: ["id", "login"],
    });

    const result = {
      role: role.title,
      users: users,
    };
    return result;
  }

  async getUserByLogin(login: string) {
    const user = await User.findOne({ where: { login } });
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
