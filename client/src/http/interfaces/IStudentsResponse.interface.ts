export interface IStudentItem {
  id: string;
  fullName: string;
}

export interface IStudentGetAll {
  count: number;
  page: number;
  limit: number;
  students: IStudentItem[];
}
