import { AxiosResponse } from "axios";
import $api from ".";
import { IStudentGetAll } from "./interfaces/IStudentsResponse.interface";

export default class StudentService {
  static async getStudents(limit: number, page: number, q = ""): Promise<AxiosResponse<IStudentGetAll>> {
    return $api.get<IStudentGetAll>(`/students?limit=${limit}&page=${page}&q=${q}`);
  }
}
