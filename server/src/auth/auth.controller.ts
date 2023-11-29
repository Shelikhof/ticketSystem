import { Body, Controller, Get, Post, Headers } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @Post("/registration")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Get()
  validateToken(@Headers("Authorization") authorizationHeader: string) {
    return this.authService.validateToken(authorizationHeader.split(" ")[1]);
  }
}
