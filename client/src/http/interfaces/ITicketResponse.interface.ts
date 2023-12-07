export interface ICreateTicket {
  platformId: string;
  groupId: string;
  curatorId: string;
  certificateId: string;
  students: string[];
}

export interface ITicketItem {
  id: string;
  title: string;
  certificate: {
    id: string;
    title: string;
  };
}

export interface IGetAllTickets {
  count: number;
  page: number;
  limit: number;
  tickets: ITicketItem[];
}

export interface ISingleTicket {
  id: string;
  title: string;
  status: "pending" | "completed" | "finished";
  curator: {
    id: string;
    fullName: string;
  };
  group: {
    id: string;
    name: string;
  };
  certificate: {
    id: string;
    title: string;
  };
  students: {
    id: string;
    fullName: string;
    isGet: boolean;
  }[];
}
