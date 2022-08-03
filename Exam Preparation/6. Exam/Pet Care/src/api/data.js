import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  getAll: "/data/pets?sortBy=_createdOn%20desc&distinct=name",
  getOne: "/data/pets/",
  create: "/data/pets",
};

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAll = () => {
  return api.getRequest(endpoints.getAll);
};

export const getOne = (id) => {
  return api.getRequest(endpoints.getOne + id);
};

export const createAnimal = (data) => {
  return api.postRequest(endpoints.create, data);
};

export const editAnimal = (id, data) => {
  return api.putRequest(endpoints.getOne + id, data);
};
