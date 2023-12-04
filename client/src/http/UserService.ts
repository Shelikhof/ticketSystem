import { AxiosResponse } from "axios";
import $api from ".";

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUserItem[]>> {
    return $api.get<IUserItem[]>("/users");
  }
}
