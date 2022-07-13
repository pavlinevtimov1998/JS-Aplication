import * as api from "./api.js";
const endpoints = {
  create: "/data/catalog",
  getAll: "/data/catalog",
  getById: "/data/catalog/",
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export const getAll = async () => {
  return api.getRequest(endpoints.getAll);
};

export const createFurniture = async (data) => {
  return api.postRequest(endpoints.create, data);
};

export const getById = async (id) => {
  return api.getRequest(endpoints.getById + id);
};

export const updateById = async (id, data) => {
  return api.putRequest(endpoints.getById + id, data);
};

export const deleteById = async (id) => {
  return api.delRequest(endpoints.getById + id);
};

export const getUserFurniture = async (userId) => {
  return api.getRequest(
    `http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`
  );
};
