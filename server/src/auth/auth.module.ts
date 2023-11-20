import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { RolesModule } from "src/roles/roles.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    RolesModule,
    forwardRef(() => UserModule),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_LIVETIME,
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
console.log(process.env.PORT);
