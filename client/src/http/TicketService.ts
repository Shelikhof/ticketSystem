import { AxiosResponse } from "axios";
import $api from ".";
import { ICreateTicket, IGetAllTickets, ISingleTicket } from "./interfaces/ITicketResponse.interface";

export default class TicketService {
  static async createTicket(data: ICreateTicket) {
    return $api.post("/tickets", data);
  }

  static async getTickets(status: string, limit: number, page: number, userId: string, role: string): Promise<AxiosResponse<IGetAllTickets>> {
    return $api.get(`/tickets?limit=${limit}&page=${page}&status=${status}&userId=${userId}&role=${role}`);
  }

  static async getSingleTicket(id: string): Promise<AxiosResponse<ISingleTicket>> {
    return $api.get<ISingleTicket>(`/tickets/${id}`);
  }

  static async changeTicketStatus(id: string, status: string) {
    return $api.put(`/tickets/${id}/status`, { status });
  }

  static async changeGettingStatus(groupId: string, studentId: string, status: boolean) {
    return $api.put(`/tickets/${groupId}/studentStatus/${studentId}`, { status });
  }

  static async deteleTicket(id: string) {
    return $api.delete(`/tickets/${id}`);
  }

  static async getTicketReport(id: string): Promise<AxiosResponse<ArrayBuffer>> {
    return $api.get(`/tickets/${id}/report`, {
      responseType: "arraybuffer",
    });
  }
}
