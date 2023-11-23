import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/createRole.dto";
import { Role } from "./roles.model";
import { InjectModel } from "@nestjs/sequelize";
import { ValidationErrorException } from "src/utils/ValidationErrorException";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  //add role
  async create(dto: CreateRoleDto) {
    const candidate = await this.roleRepository.findOne({
      where: {
        title: dto.title,
      },
    });
    if (candidate) {
      throw new ValidationErrorException("Роль уже существует");
    }
    const role = await this.roleRepository.create(dto);
    return role;
  }

  //get all roles
  async getAll() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }

  //get role by Id
  async getById(id: string) {
    const role = await this.roleRepository.findByPk(id);
    if (!role) {
      throw new ValidationErrorException("Роль не найдена");
    }
    return role;
  }

  //delete role by id
  async deleteById(id: string) {
    const role = await this.getById(id);
    if (!role) {
      throw new ValidationErrorException("Роль не найдена");
    }
    (await role).destroy();
    return role;
  }

  //edit role by id
  async editById(id: string, dto: CreateRoleDto) {
    const role = await this.getById(id);
    if (!role) {
      throw new ValidationErrorException("Роль не найдена");
    }
    await this.roleRepository.update(dto, { where: { id: id } });
    const updateRole = await this.getById(id);
    return updateRole;
  }
}
