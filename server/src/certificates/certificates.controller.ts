import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CertificatesService } from "./certificates.service";
import { CreateCertificateDto } from "./dto/createCertificate.dto";

@Controller("certificates")
export class CertificatesController {
  constructor(private certificateService: CertificatesService) {}

  //add certificate
  @Post()
  create(@Body() dto: CreateCertificateDto) {
    return this.certificateService.create(dto);
  }

  //get all certificates
  @Get()
  getAll() {
    return this.certificateService.getAll();
  }

  //get certificate by id
  @Get(":certificateId")
  getById(@Param("certificateId") certificateId: string) {
    return this.certificateService.getById(certificateId);
  }

  //delete certificate
  @Delete(":certificateId")
  delete(@Param("certificateId") certificateId: string) {
    return this.certificateService.deleteById(certificateId);
  }

  //edit certificate
  @Put(":certificateId")
  edit(@Param("certificateId") certificateId: string, @Body() dto: CreateCertificateDto) {
    return this.certificateService.editById(certificateId, dto);
  }
}
