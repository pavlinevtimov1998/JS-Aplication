import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  allGames: "/data/games?sortBy=_createdOn%20desc",
  recentGames: "/data/games?sortBy=_createdOn%20desc&distinct=category",
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
