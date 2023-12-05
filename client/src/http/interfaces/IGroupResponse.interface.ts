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
