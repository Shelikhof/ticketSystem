import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
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
  getAll(@Query() query: any) {
    if (query.limit && query.page && query.q) {
      return this.groupsService.getBySearch(query.limit, query.page, query.q);
    }
    if (query.limit && query.page) {
      return this.groupsService.getAllWithLimit(query.limit, query.page);
    }

    return this.groupsService.getAll();
  }
}
