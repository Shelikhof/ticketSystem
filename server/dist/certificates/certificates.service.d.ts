import { Certificate } from "./certificates.model";
import { CreateCertificateDto } from "./dto/createCertificate.dto";
export declare class CertificatesService {
    private certificateRepository;
    constructor(certificateRepository: typeof Certificate);
    create(dto: CreateCertificateDto): Promise<Certificate>;
    getAll(): Promise<Certificate[]>;
    getById(id: string): Promise<Certificate>;
    deleteById(id: string): Promise<Certificate>;
    editById(id: string, dto: CreateCertificateDto): Promise<Certificate>;
}
