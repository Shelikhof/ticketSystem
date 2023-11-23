import { Module } from "@nestjs/common";
import { CertificatesService } from "./certificates.service";
import { CertificatesController } from "./certificates.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Certificate } from "./certificates.model";

@Module({
  providers: [CertificatesService],
  controllers: [CertificatesController],
  imports: [SequelizeModule.forFeature([Certificate])],
})
export class CertificatesModule {}
