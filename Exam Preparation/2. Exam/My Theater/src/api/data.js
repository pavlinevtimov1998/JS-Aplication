import * as api from "./api.js";
import * as user from "./user.js";

const endpoints = {
  allTheaters: "/data/theaters?sortBy=_createdOn%20desc&distinct=title",
  createTheater: "/data/theaters",
  getTheaterById: "/data/theaters/",
  userTheaters: (userId) =>
    `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
};

export const login = user.login;
export const register = user.register;
export const logout = user.logout;

// GET REQUESTS

export const allTheaters = async () => {
  return await api.getRequest(endpoints.allTheaters);
};

export const getTheaterById = async (id) => {
  return await api.getRequest(endpoints.getTheaterById + id);
};

export const getUserTheaters = async (userId) => {
  return await api.getRequest(endpoints.userTheaters(userId));
};

// POST REQUESTS

export const createTheater = async (data) => {
  return await api.postRequest(endpoints.createTheater, data);
};

// PUT REQUESTS

export const editTheater = async (id, data) => {
  return await api.putRequest(endpoints.getTheaterById + id, data);
};

// DELETE REQUESTS

export const deleteTheater = async (id) => {
  return await api.delRequest(endpoints.getTheaterById + id);
};
