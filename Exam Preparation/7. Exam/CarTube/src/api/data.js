import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  getAll: "/data/cars?sortBy=_createdOn%20desc",
  getOne: "/data/cars/",
  create: "/data/cars",
  userCars: (userId) =>
    `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  search: (query) => `/data/cars?where=year%3D${query}`,
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

export const getUserCars = (userId) => {
  return api.getRequest(endpoints.userCars(userId));
};

export const getSearchedCars = (query) => {
  return api.getRequest(endpoints.search(query));
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
