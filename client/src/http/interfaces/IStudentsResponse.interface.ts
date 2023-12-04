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

export interface ISingleStudent {
  id: string;
  firstName: string;
  lastName: string;
  surName: string;
  fullName: string;
  birthDate: Date;
  gender: string;
  group: {
    id: string;
    name: string;
  } | null;
  platform: {
    id: string;
    name: string;
  };
}
