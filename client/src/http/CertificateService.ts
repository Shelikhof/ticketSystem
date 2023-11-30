import { AxiosResponse } from "axios";
import $api from ".";
import { ICertificateItem } from "./interfaces/ICertificatesRespones.interface";

export default class CertificateService {
  static async getCertificates(): Promise<AxiosResponse<ICertificateItem[]>> {
    return $api.get<ICertificateItem[]>("/certificates");
  }

  static async getSignleCertificates(id: string): Promise<AxiosResponse<ICertificateItem>> {
    return $api.get<ICertificateItem>(`/certificates/${id}`);
  }

  static async createCertificate(title: string): Promise<AxiosResponse<ICertificateItem>> {
    return $api.post<ICertificateItem>("/certificates/", { title });
  }

  static async deleteCertificate(id: string): Promise<AxiosResponse<ICertificateItem>> {
    return $api.delete<ICertificateItem>(`/certificates/${id}`);
  }

  static async editCertificate(data: { title: string }, id: string): Promise<AxiosResponse<ICertificateItem>> {
    return $api.put<ICertificateItem>(`/certificates/${id}`, { title: data.title });
  }
}
