export interface IUserItem {
  id: string;
  fullName: string;
}

export interface IUserGetAll {
  count: number;
  page: number;
  limit: number;
  users: IUserItem[];
}

export interface ISingleUser {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  surName: string | null;
  fullName: string;
  telNum: string;
  role: {
    id: string;
    title: string;
  };
  platform: {
    id: string;
    title: string;
  };
}
