import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import LocalStorage from "../../services/localStorage";
import UserService from "../../services/userService";
import type { CreateUserType, LoginUserType, UpdateUserType } from "../../types";

type UserStateType = {
  user: UserType;
  statusUser: string;
};

type UserType = {
  token: string;
  email: string;
  username: string;
  image: string;
};

const UserServices = new UserService();
const UserLocalStorage = new LocalStorage();

export const createUser = createAsyncThunk<UserStateType, CreateUserType>(
  "userSlice/createUser",
  async function (user, { rejectWithValue }) {
    return UserServices.userCreate(user, { rejectWithValue });
  }
);

export const loginUser = createAsyncThunk<UserStateType, LoginUserType>(
  "userSlice/loginUser",
  async (user, { rejectWithValue }) => {
    return UserServices.userLogin(user, { rejectWithValue });
  }
);

export const updateUser = createAsyncThunk<UserStateType, UpdateUserType>(
  "userSlice/updateUser",
  async ({ user, token }, { rejectWithValue }) => {
    return UserServices.userUpdate({ user, token }, { rejectWithValue });
  }
);

const initialState: UserStateType = {
  user: { token: "", email: "", username: "", image: "" },
  statusUser: "",
};

const userSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    logOut(state) {
      state.user = { token: "", email: "", username: "", image: "" };
      UserLocalStorage.logout();
    },
    resetStatus(state) {
      state.statusUser = "success";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.statusUser = "loading";
      })
      .addCase(createUser.fulfilled, (state) => {
        state.statusUser = "success";
      })
      .addCase(createUser.rejected, (state) => {
        state.statusUser = "error";
      })

      .addCase(loginUser.pending, (state) => {
        state.statusUser = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.statusUser = "success";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.statusUser = "error";
      })

      .addCase(updateUser.pending, (state) => {
        state.statusUser = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.statusUser = "success";
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.statusUser = "error";
      });
  },
});

export const { resetStatus, logOut } = userSlice.actions;

export default userSlice.reducer;
