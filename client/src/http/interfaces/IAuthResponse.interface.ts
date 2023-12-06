export interface IAuthResponse {
  token: string;
  user: IUserInfo;
}

export interface IUserInfo {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  role: string;
}
