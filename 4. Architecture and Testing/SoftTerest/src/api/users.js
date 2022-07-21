import { removeUserData, setUserData } from "../util.js";
import * as api from "./api.js";

const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
};

export async function login(email, password) {
  const result = await api.postRequest(endpoints.login, { email, password });

  const userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };

  setUserData(userData);
}

export async function register(email, password) {
  const result = await api.postRequest(endpoints.register, { email, password });

  const userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };

  setUserData(userData);
}

export async function logout() {
  await api.getRequest(endpoints.logout);
  removeUserData();
}
