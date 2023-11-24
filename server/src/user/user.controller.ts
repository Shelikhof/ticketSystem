import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  //add user
  // @Post()
  // create(@Body() dto: CreateUserDto) {
  //   return this.userService.createUser(dto);
  // }

  //get users
  @Get()
  getAll(@Query() query: any) {
    //get user by role and platform
    if (query.roleId && query.platformId && query.page && query.limit) {
      return this.userService.getAllByRoleAndPlatform(query.roleId, query.platformId, query.page, query.limit);
    }

    //get user by role, can by search value
    if (query.roleId && query.page && query.limit) {
      return this.userService.getAllBySearchAndRole(query.q, query.roleId, query.page, query.limit);
    }
    return this.userService.getAll();
  }

  //get user by id
  @Get(":userId")
  getById(@Param("userId") userId: string) {
    return this.userService.getById(userId);
  }

  //edit user by id
  @Put("/edit/:userId")
  edit(@Param("userId") userId: string, @Body() dto: CreateUserDto) {
    return this.userService.edit(userId, dto);
  }

  //delete user by id
  @Delete(":userId")
  delete(@Param("userId") userId: string) {
    return this.userService.delete(userId);
  }
}
