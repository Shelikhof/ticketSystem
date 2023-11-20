import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/createRole.dto";
import { Role } from "./roles.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getById(id: string) {
    const role = await this.roleRepository.findByPk(id);
    return role;
  }

  async getAll() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }
}
