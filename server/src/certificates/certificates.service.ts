import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Certificate } from "./certificates.model";
import { ValidationErrorException } from "src/utils/ValidationErrorException";
import { CreateCertificateDto } from "./dto/createCertificate.dto";

@Injectable()
export class CertificatesService {
  constructor(@InjectModel(Certificate) private certificateRepository: typeof Certificate) {}

  //add certificate
  async create(dto: CreateCertificateDto) {
    const candidate = await this.certificateRepository.findOne({
      where: {
        title: dto.title,
      },
    });
    if (candidate) {
      throw new ValidationErrorException("Справка уже существует");
    }
    const certificate = await this.certificateRepository.create(dto);
    return certificate;
  }

  //get all certificates
  async getAll() {
    const certificates = await this.certificateRepository.findAll();
    return certificates;
  }

  //get certificate by Id
  async getById(id: string) {
    const certificate = await this.certificateRepository.findByPk(id);
    if (!certificate) {
      throw new ValidationErrorException("Справка не найдена");
    }
    return certificate;
  }

  //delete certificate by id
  async deleteById(id: string) {
    const certificate = await this.getById(id);
    if (!certificate) {
      throw new ValidationErrorException("Справка не найдена");
    }
    (await certificate).destroy();
    return certificate;
  }

  //edit certificate by id
  async editById(id: string, dto: CreateCertificateDto) {
    const certificate = await this.getById(id);
    if (!certificate) {
      throw new ValidationErrorException("Справка не найдена");
    }
    await this.certificateRepository.update(dto, { where: { id: id } });
    const updateCertificate = await this.getById(id);
    return updateCertificate;
  }
}
