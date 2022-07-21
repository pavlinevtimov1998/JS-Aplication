import * as api from "./api.js";
import * as users from "./users.js";

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

const endpoints = {
  movies: "/data/movies",
  getById: "/data/movies/",
};

export async function getMovies() {
  return api.getRequest(endpoints.movies);
}

export async function getById(id) {
  return api.getRequest(endpoints.getById + id);
}

export async function createMovie(data) {
  return api.postRequest(endpoints.movies, data);
}

export async function editMovie(id, data) {
  return api.putRequest(endpoints.getById + id, data);
}

export async function deleteMovie(id) {
  return api.delRequest(endpoints.getById + id);
}