import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  getAll: "/data/pets?sortBy=_createdOn%20desc&distinct=name",
};

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAll = async () => {
  return api.getRequest(endpoints.getAll);
};
