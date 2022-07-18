import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  allMemes: "/data/memes?sortBy=_createdOn%20desc",
  createMeme: "/data/memes",
  getById: "/data/memes/",
};

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAllMemes = async () => {
  return await api.getRequest(endpoints.allMemes);
};

export const getMemeById = async (id) => {
  return api.getRequest(endpoints.getById + id);
};

export const createMeme = async (data) => {
  return await api.postRequest(endpoints.createMeme, data);
};

export const editMeme = async (id, data) => {
  return api.putRequest(endpoints.getById + id, data);
};
