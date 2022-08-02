import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  getAll: "/data/books?sortBy=_createdOn%20desc",
};

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAll = async () => {
  return api.getRequest(endpoints.getAll);
};
