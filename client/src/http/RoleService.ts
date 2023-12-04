import { AxiosResponse } from "axios";
import { IRoleItem } from "./interfaces/IRolesRespones.interface";
import $api from ".";

export default class RoleService {
  static async getRoles(): Promise<AxiosResponse<IRoleItem[]>> {
    return $api.get<IRoleItem[]>("/roles");
  }
}
