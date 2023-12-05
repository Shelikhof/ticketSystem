import { AxiosResponse } from "axios";
import $api from ".";
import { IUserFields } from "../components/UserPage/UserForm";
import { ISingleUser, IUserGetAll, IUserItem } from "./interfaces/IUserResponse.interface";

export default class UserService {
  static async getUsers(q: string, roleId: string, limit: number, page: number): Promise<AxiosResponse<IUserGetAll>> {
    if (roleId === "all") roleId = "";
    return $api.get<IUserGetAll>(`/users?q=${q.trim()}&roleId=${roleId}&limit=${limit}&page=${page}`);
  }

  static async getSingleUser(id: string): Promise<AxiosResponse<ISingleUser>> {
    return $api.get<ISingleUser>(`/users/p/${id}`);
  }

  static async createUser(data: IUserFields) {
    return $api.post("/auth/registration", data);
  }

  static async editUser(data: IUserFields, id: string) {
    return $api.put(`/users/p/${id}`, data);
  }

  static async deleteUser(id: string) {
    return $api.delete(`/users/p/${id}`);
  }

  static async getTeachersBySearch(q: string): Promise<AxiosResponse<IUserItem[]>> {
    return $api.get<IUserItem[]>(`/users/teachers?q=${q}`);
  }
}
