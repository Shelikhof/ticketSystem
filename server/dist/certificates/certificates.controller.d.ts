import { CertificatesService } from "./certificates.service";
import { CreateCertificateDto } from "./dto/createCertificate.dto";
export declare class CertificatesController {
    private certificateService;
    constructor(certificateService: CertificatesService);
    create(dto: CreateCertificateDto): Promise<import("./certificates.model").Certificate>;
    getAll(): Promise<import("./certificates.model").Certificate[]>;
    getById(certificateId: string): Promise<import("./certificates.model").Certificate>;
    delete(certificateId: string): Promise<import("./certificates.model").Certificate>;
    edit(certificateId: string, dto: CreateCertificateDto): Promise<import("./certificates.model").Certificate>;
}
