import { Module } from "@nestjs/common";
import { PlatformController } from "./platform.controller";
import { PlatformService } from "./platform.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Platform } from "./platform.model";

@Module({
  controllers: [PlatformController],
  providers: [PlatformService],
  imports: [SequelizeModule.forFeature([Platform])],
  exports: [PlatformService],
})
export class PlatformModule {}
