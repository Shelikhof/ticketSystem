import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserInfo } from "../../interfaces/response/IAuthResponse";
import { AxiosError } from "axios";
import AuthService from "../../http/AuthService";

interface ILogin {
  login: string;
  password: string;
}

interface IError {
  message: string;
}
//delete all those file
export const loginRequest = createAsyncThunk<IUserInfo, ILogin, { rejectValue: string | void | any }>("authSlice/registration", async ({ login, password }, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(login, password);
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (e) {
    const error = e as AxiosError<IError>;
    return rejectWithValue(error.response?.data.message);
  }
});
