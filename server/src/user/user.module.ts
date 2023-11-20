import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { Role } from "src/roles/roles.model";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User, Role]), forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
