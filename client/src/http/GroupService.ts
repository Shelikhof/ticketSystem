import { AxiosResponse } from "axios";
import $api from ".";
import { IGroupGetAll, ISingleGroup } from "./interfaces/IGroupResponse.interface";
import { IGroupFields } from "../components/GroupPage/GroupForm";

export default class GroupService {
  static async getGroups(limit: number, page: number, searchValue: string): Promise<AxiosResponse<IGroupGetAll>> {
    return $api.get<IGroupGetAll>(`/groups?limit=${limit}&page=${page}&q=${searchValue}`);
  }

  static async getSingleGroup(id: string): Promise<AxiosResponse<ISingleGroup>> {
    return $api.get<ISingleGroup>(`/groups/${id}`);
  }

  static async createGroup(data: IGroupFields) {
    return $api.post("/groups", data);
  }

  static async editGroup(id: string, data: IGroupFields) {
    return $api.put(`/groups/${id}`, data);
  }

  static async deleteGroup(id: string) {
    return $api.delete(`/groups/${id}`);
  }

  static async getGroupByCuratorId(id: string): Promise<AxiosResponse<ISingleGroup>> {
    return $api.get<ISingleGroup>(`/groups?curatorId=${id}`);
  }
}
