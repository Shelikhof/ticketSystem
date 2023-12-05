import { AxiosResponse } from "axios";
import $api from ".";
import { IGroupGetAll } from "./interfaces/IGroupResponse.interface";

export default class GroupService {
  static async getGroups(limit: number, page: number, searchValue: string): Promise<AxiosResponse<IGroupGetAll>> {
    return $api.get<IGroupGetAll>(`/groups?limit=${limit}&page=${page}&q=${searchValue}`);
  }
}
