import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { UserStateType, CreateUserType, LoginUserType, UpdateUserType } from "../../types";

export const createUser = createAsyncThunk<UserStateType, CreateUserType>(
  "userSlice/createUser",
  async function (user, { rejectWithValue }) {
    return axios({
      method: "POST",
      url: "https://blog.kata.academy/api/users",
      data: {
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      },
    })
      .then((response) => response.data)
      .catch(() => rejectWithValue(null));
  }
);

export const loginUser = createAsyncThunk<UserStateType, LoginUserType>(
  "userSlice/loginUser",
  async (user, { rejectWithValue }) => {
    return axios({
      method: "POST",
      url: "https://blog.kata.academy/api/users/login",
      data: {
        user: {
          email: user.email,
          password: user.password,
        },
      },
    })
      .then((response) => {
        localStorage.setItem("email", String(user.email));
        localStorage.setItem("pass", String(user.password));
        return response.data;
      })
      .catch(() => rejectWithValue(null));
  }
);

export const updateUser = createAsyncThunk<UserStateType, UpdateUserType>(
  "userSlice/updateUser",
  async ({ user, token }, { rejectWithValue }) => {
    return axios({
      method: "PUT",
      url: "https://blog.kata.academy/api/user",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        user,
      },
    })
      .then((response) => {
        localStorage.setItem("pass", user.password);
        return response.data;
      })
      .catch(() => rejectWithValue(null));
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
      localStorage.removeItem("email");
      localStorage.removeItem("pass");
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
