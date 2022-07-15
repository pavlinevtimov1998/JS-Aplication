import * as api from "./api.js";
const endpoints = {
  create: "/data/albums",
  getAll: "/data/albums?sortBy=_createdOn%20desc&distinct=name",
  getById: "/data/albums/",
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export const getAll = async () => {
  return api.getRequest(endpoints.getAll);
};

export const create = async (data) => {
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

export const searchByQuery = async (query) => {
  return api.getRequest(`/data/albums?where=name%20LIKE%20%22${query}%22`);
};
