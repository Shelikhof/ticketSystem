import { PlatformService } from "./platform.service";
import { CreatePlatformDto } from "./dto/createPlatform.dto";
export declare class PlatformController {
    private platformService;
    constructor(platformService: PlatformService);
    create(dto: CreatePlatformDto): Promise<import("./platform.model").Platform>;
    getAll(): Promise<import("./platform.model").Platform[]>;
    getById(platformId: string): Promise<import("./platform.model").Platform>;
    delete(platformId: string): Promise<import("./platform.model").Platform>;
    edit(platformId: string, dto: CreatePlatformDto): Promise<import("./platform.model").Platform>;
}
