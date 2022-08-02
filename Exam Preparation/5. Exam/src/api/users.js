import { removeUserData, setUserData } from "../util.js";
import * as api from "./api.js";

const userEndpoints = {
  login: "users/login",
  register: "users/register",
  logout: "users/logout",
};

export async function login(email, password) {
  const result = await api.postRequest(userEndpoints.login, {
    email,
    password,
  });

  const userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };

  setUserData(userData);
}

export async function register(email, password) {
  const result = await api.postRequest(userEndpoints.register, {
    email,
    password,
  });

  const userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };

  setUserData(userData);
}

export async function logout() {
  await api.getRequest(userEndpoints.logout);
  removeUserData();
}
