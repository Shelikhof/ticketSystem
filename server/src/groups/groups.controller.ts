import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateGroupDto } from "./dto/createGroup.dto";
import { GroupsService } from "./groups.service";

@Controller("groups")
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post("/add")
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }

  @Put("/edit/:groupId")
  edit() {}

  @Delete(":groupId")
  delete(@Param("groupId") groupId: string) {
    return this.groupsService.delete(groupId);
  }

  @Get(":groupId")
  getById(@Param("groupId") groupId: string) {
    return this.groupsService.getById(groupId);
  }

  @Get()
  getAll() {
    return this.groupsService.getAll();
  }
}
