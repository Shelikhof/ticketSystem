import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  role: string;
  name: {
    firstName: string;
    lastName: string;
  };
  isAuth: boolean;
  isLoading: boolean;
  error: string | void;
}

const initialState: initialState = {
  role: "",
  name: {
    firstName: "",
    lastName: "",
  },
  isAuth: false,
  isLoading: true,
  error: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.isAuth = true;
      state.isLoading = false;
      state.name = payload.name;
      state.role = payload.role;
    },

    clearUserInfo(state) {
      state.isAuth = true;
      state.name.firstName = "";
      state.name.lastName = "";
      state.role = "";
    },
  },

  //delete extra reducers
  // extraReducers(builder) {
  //   builder
  //     .addCase(loginRequest.fulfilled, (state, action) => {
  //       state.isAuth = true;
  //       state.isLoading = false;
  //       state.name = action.payload.name;
  //       state.role = action.payload.role;
  //       state.error = "";
  //     })
  //     .addCase(loginRequest.rejected, (state, action) => {
  //       state.error = action.payload;
  //     });
  // },
});

export default authSlice.reducer;
export const { setUserInfo, clearUserInfo } = authSlice.actions;
