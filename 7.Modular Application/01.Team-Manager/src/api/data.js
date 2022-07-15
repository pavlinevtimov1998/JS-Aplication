import * as api from "./api.js";
const endpoints = {
  create: "/data/catalog",
  getAllTeams: "/data/teams",
  getAllMembers: "/data/members?where=status%3D%22member%22",
  getById: "/data/catalog/",
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export const getAllTeams = async () => {
  return api.getRequest(endpoints.getAllTeams);
};

export const getAllMembers = async () => {
  return api.getRequest(endpoints.getAllMembers);
}

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
