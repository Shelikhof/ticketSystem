import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/createRole.dto";

@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  //add role
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  //get all roles
  @Get()
  getAll() {
    return this.roleService.getAll();
  }

  //get role by id
  @Get(":roleId")
  getById(@Param("roleId") roleId: string) {
    return this.roleService.getById(roleId);
  }

  //delete role
  @Delete(":roleId")
  delete(@Param("roleId") roleId: string) {
    return this.roleService.deleteById(roleId);
  }

  //edit role
  @Put(":roleId")
  edit(@Param("roleId") roleId: string, @Body() dto: CreateRoleDto) {
    return this.roleService.editById(roleId, dto);
  }
}
