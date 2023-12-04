import { AxiosResponse } from "axios";
import $api from ".";
import { IPlatformItem } from "./interfaces/IPlatformResponse.interface";

export default class PlatformService {
  static async getPlatforms(): Promise<AxiosResponse<IPlatformItem[]>> {
    return $api.get<IPlatformItem[]>(`/platform`);
  }
}
