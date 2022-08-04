import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  getAll: "/data/cars?sortBy=_createdOn%20desc",
  getOne: "/data/cars/",
  create: "/data/cars",
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

export const createCar = (data) => {
  return api.postRequest(endpoints.create, data);
};

export const editCar = (id, data) => {
  return api.putRequest(endpoints.getOne + id, data);
};

export const deleteCar = (id) => {
  return api.delRequest(endpoints.getOne + id);
};
