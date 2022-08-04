import { removeUserData, setUserData } from "../util.js";
import * as api from "./api.js";

const userEndpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(username, password) {
  const result = await api.postRequest(userEndpoints.login, {
    username,
    password,
  });

  const userData = {
    username: result.username,
    id: result._id,
    token: result.accessToken,
  };

  setUserData(userData);
}

export async function register(username, password) {
  const result = await api.postRequest(userEndpoints.register, {
    username,
    password,
  });

  const userData = {
    username: result.username,
    id: result._id,
    token: result.accessToken,
  };

  setUserData(userData);
}

export async function logout() {
  await api.getRequest(userEndpoints.logout);
  removeUserData();
}
