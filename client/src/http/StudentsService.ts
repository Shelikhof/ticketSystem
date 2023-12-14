import { AxiosResponse } from "axios";
import $api from ".";
import { ISingleStudent, IStudentGetAll, IStudentItem } from "./interfaces/IStudentsResponse.interface";
import { IStudentFields } from "../components/StudentsPage/StudentForm";

export default class StudentService {
  static async getStudents(limit: number, page: number, q = ""): Promise<AxiosResponse<IStudentGetAll>> {
    return $api.get<IStudentGetAll>(`/students?limit=${limit}&page=${page}&q=${q.trim()}`);
  }

  static async createStudent(data: IStudentFields): Promise<AxiosResponse<IStudentItem>> {
    const date = data.birthDate.split(".");
    return $api.post<IStudentItem>("/students/add", {
      firstName: data.firstName,
      lastName: data.lastName,
      surName: data.surName,
      birthDate: new Date(`${date[2]}-${date[1]}-${date[0]}`),
      gender: data.gender,
      platformId: data.platform,
    });
  }

  static async getSingleStudent(id: string): Promise<AxiosResponse<ISingleStudent>> {
    return $api.get<ISingleStudent>(`/students/${id}`);
  }

  static async editStudent(data: IStudentFields, id: string): Promise<AxiosResponse<ISingleStudent>> {
    return $api.put<ISingleStudent>(`/students/${id}`, {
      firstName: data.firstName,
      lastName: data.lastName,
      surName: data.surName,
      birthDate: data.birthDate,
      gender: data.gender,
      platformId: data.platform,
    });
  }

  static async deleteStudent(id: string): Promise<AxiosResponse<ISingleStudent>> {
    return $api.delete(`/students/${id}`);
  }

  static async getFreeStudents(searchValue: string): Promise<AxiosResponse<IStudentItem[]>> {
    return $api.get<IStudentItem[]>(`/students?isFree=true&q=${searchValue}`);
  }
}
