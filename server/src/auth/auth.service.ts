import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/user/user.model";
import { RolesService } from "src/roles/roles.service";
import { Role } from "src/roles/roles.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const role = await this.rolesService.getById(user.roleId);
    return this.generateToken(user, role);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException("Пользователь с таким логином уже существует", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, Number(process.env.SALT));
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    const role = await this.rolesService.getById(user.roleId);
    return this.generateToken(user, role);
  }

  async generateToken(user: User, role: Role) {
    const payload = { email: user.login, id: user.id, role: role.title };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    if (!user) {
      throw new HttpException("Некорректные данные", HttpStatus.BAD_REQUEST);
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException("Некорректные данные", HttpStatus.BAD_REQUEST);
  }
}
