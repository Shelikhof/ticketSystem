export interface IAuthResponse {
  token: string;
  user: IUserInfo;
}

export interface IUserInfo {
  name: {
    firstName: string;
    lastName: string;
  };
  role: string;
}
