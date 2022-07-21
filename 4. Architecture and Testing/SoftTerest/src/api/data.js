import * as api from "./api.js";
import * as users from "./users.js";
const endpoints = {
  ideas: "/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
  create: "/data/ideas",
  getById: "/data/ideas/",
};

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAllIdeas = async () => {
  return api.getRequest(endpoints.ideas);
};

export const createIdea = async (data) => {
  return api.postRequest(endpoints.create, data);
};

export const getWithId = async (id) => {
  return api.getRequest(endpoints.getById + id);
};

export const deleteById = async (id) => {
  return api.delRequest(endpoints.getById + id);
};
