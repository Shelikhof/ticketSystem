import { Injectable } from "@nestjs/common";
import { ValidationErrorException } from "src/utils/ValidationErrorException";
import { CreatePlatformDto } from "./dto/createPlatform.dto";
import { Platform } from "./platform.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class PlatformService {
  constructor(@InjectModel(Platform) private platformRepository: typeof Platform) {}

  //add platform
  async create(dto: CreatePlatformDto) {
    const candidate = await this.platformRepository.findOne({
      where: {
        title: dto.title,
      },
    });
    if (candidate) {
      throw new ValidationErrorException("Площадка уже существует");
    }
    const platform = await this.platformRepository.create(dto);
    return platform;
  }

  //get all platforms
  async getAll() {
    const platforms = await this.platformRepository.findAll();
    return platforms;
  }

  //get platform by Id
  async getById(id: string) {
    const platform = await this.platformRepository.findByPk(id);
    if (!platform) {
      throw new ValidationErrorException("Платформа не найдена");
    }
    return platform;
  }

  //delete platform by id
  async deleteById(id: string) {
    const platform = await this.getById(id);
    if (!platform) {
      throw new ValidationErrorException("Платформа не найдена");
    }
    (await platform).destroy();
    return platform;
  }

  //edit platform by id
  async editById(id: string, dto: CreatePlatformDto) {
    const platform = await this.getById(id);
    if (!platform) {
      throw new ValidationErrorException("Платформа не найдена");
    }
    await this.platformRepository.update(dto, { where: { id: id } });
    const updatePlatform = await this.getById(id);
    return updatePlatform;
  }
}
