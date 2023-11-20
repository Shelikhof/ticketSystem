import { Body, Controller, Get, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/createRole.dto";

@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  getAll() {
    return this.roleService.getAll();
  }
}
