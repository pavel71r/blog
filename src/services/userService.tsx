import axios from "axios";

import type { CreateUserType, LoginUserType, UpdateUserType } from "../types";

import LocalStorage from "./localStorage";

const UserLocalStorage = new LocalStorage();

type RejectedType = { rejectWithValue: (value: unknown) => void };

export default class UserService {
  BaseUrl = "https://blog.kata.academy/api/";

  async userCreate(user: CreateUserType, { rejectWithValue }: RejectedType) {
    return axios({
      method: "POST",
      url: `${this.BaseUrl}users`,
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

  async userLogin(user: LoginUserType, { rejectWithValue }: RejectedType) {
    return axios({
      method: "POST",
      url: `${this.BaseUrl}users/login`,
      data: {
        user: {
          email: user.email,
          password: user.password,
        },
      },
    })
      .then((response) => {
        UserLocalStorage.saveEmail(user.email);
        UserLocalStorage.savePass(user.password);
        return response.data;
      })
      .catch(() => rejectWithValue(null));
  }

  async userUpdate({ user, token }: UpdateUserType, { rejectWithValue }: RejectedType) {
    return axios({
      method: "PUT",
      url: `${this.BaseUrl}user`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        user,
      },
    })
      .then((response) => {
        UserLocalStorage.savePass(user.password);
        return response.data;
      })
      .catch(() => rejectWithValue(null));
  }
}
