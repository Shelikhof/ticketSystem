export interface IGroupItem {
  id: string;
  title: string;
}

export interface IGroupGetAll {
  count: number;
  page: number;
  limit: number;
  groups: IGroupItem[];
}

export interface ISingleGroup {
  id: string;
  title: string;
  students: { id: string; fullName: string }[];
  curator: {
    id: string;
    fullName: string;
  };
  platform: {
    id: string;
    title: string;
  };
}
