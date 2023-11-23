import { CreatePlatformDto } from "./dto/createPlatform.dto";
import { Platform } from "./platform.model";
export declare class PlatformService {
    private platformRepository;
    constructor(platformRepository: typeof Platform);
    create(dto: CreatePlatformDto): Promise<Platform>;
    getAll(): Promise<Platform[]>;
    getById(id: string): Promise<Platform>;
    deleteById(id: string): Promise<Platform>;
    editById(id: string, dto: CreatePlatformDto): Promise<Platform>;
}
