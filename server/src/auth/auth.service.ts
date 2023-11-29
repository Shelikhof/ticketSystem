import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/user/user.model";
import { RolesService } from "src/roles/roles.service";
import { Role } from "src/roles/roles.model";
import { LoginDto } from "./dto/login.dto";
import { PlatformService } from "src/platform/platform.service";
import { Platform } from "src/platform/platform.model";
import { TokenPayload } from "./tokenPayload.types";

@Injectable()
export class AuthService {
  constructor(
    private platformService: PlatformService,
    private userService: UserService,
    private rolesService: RolesService,
    private jwtService: JwtService
  ) {}

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    const role = await this.rolesService.getById(user.roleId);
    const platform = await this.platformService.getById(user.platformId);
    const token = await this.generateToken(user, role, platform);
    return {
      token,
      user: {
        name: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
        role: role.title,
      },
    };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException("Пользователь с таким логином уже существует", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, Number(process.env.SALT));
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return { user: { id: user.id } };
  }

  async generateToken(user: User, role: Role, platform: Platform) {
    const payload: TokenPayload = { login: user.login, id: user.id, role: { id: role.id, title: role.title }, platform: { id: platform.id, title: platform.title } };
    return this.jwtService.sign(payload);
  }

  async validateUser(userDto: LoginDto) {
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

  async validateToken(token: string) {
    try {
      const payload: TokenPayload = await this.jwtService.verify(token);
      const user = await this.userService.getById(payload.id);
      const role = await this.rolesService.getById(payload.role.id);
      const platform = await this.platformService.getById(payload.platform.id);
      const newToken = await this.generateToken(user, role, platform);
      return {
        token: newToken,
        user: {
          name: {
            firstName: user.firstName,
            lastName: user.lastName,
          },
          role: role.title,
        },
      };
    } catch (e) {
      throw new HttpException("Токен невалидный", HttpStatus.UNAUTHORIZED);
    }
  }
}
