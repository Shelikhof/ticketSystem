import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED);
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (error) {
      throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED);
    }
  }
}
