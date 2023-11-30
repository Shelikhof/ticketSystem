import { AxiosResponse } from "axios";
import $api from ".";
import { IAuthResponse } from "./interfaces/IAuthResponse.interface";

export default class AuthService {
  static async login(login: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>("/auth/login", { login, password });
  }

  static async validateToken(): Promise<AxiosResponse<IAuthResponse>> {
    return $api.get<IAuthResponse>("auth");
  }
}
