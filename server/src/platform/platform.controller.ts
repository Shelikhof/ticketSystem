import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PlatformService } from "./platform.service";
import { CreatePlatformDto } from "./dto/createPlatform.dto";

@Controller("platform")
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  //add platform
  @Post()
  create(@Body() dto: CreatePlatformDto) {
    return this.platformService.create(dto);
  }

  //get all platforms
  @Get()
  getAll() {
    return this.platformService.getAll();
  }

  //get platform by id
  @Get(":platformId")
  getById(@Param("platformId") platformId: string) {
    return this.platformService.getById(platformId);
  }

  //delete platform
  @Delete(":platformId")
  delete(@Param("platformId") platformId: string) {
    return this.platformService.deleteById(platformId);
  }

  //edit platform
  @Put(":platformId")
  edit(@Param("platformId") platformId: string, @Body() dto: CreatePlatformDto) {
    return this.platformService.editById(platformId, dto);
  }
}
