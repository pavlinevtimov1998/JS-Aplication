import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  getAll: "/data/books?sortBy=_createdOn%20desc",
  getOne: "/data/books/",
  create: "/data/books",
};

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAll = async () => {
  return api.getRequest(endpoints.getAll);
};

export const getOne = async (id) => {
  return api.getRequest(endpoints.getOne + id);
};

export const createBook = (book) => {
  return api.postRequest(endpoints.create, book);
};
