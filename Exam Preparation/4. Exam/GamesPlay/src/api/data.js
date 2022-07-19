import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  allGames: "/data/games?sortBy=_createdOn%20desc",
  recentGames: "/data/games?sortBy=_createdOn%20desc&distinct=category",
  create: "/data/games",
  getById: "/data/games/",
};

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAllGames = async () => {
  return await api.getRequest(endpoints.allGames);
};

export const getLastAddedGames = async () => {
  return api.getRequest(endpoints.recentGames);
};

export const getGameDetails = async (id) => {
  return api.getRequest(endpoints.getById + id);
};

export const createGame = async (data) => {
  return api.postRequest(endpoints.create, data);
};
