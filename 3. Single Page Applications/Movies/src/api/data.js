import * as api from "./api.js";

const endpoints = {
  getAllMovies: "/data/movies",
  getMovieById: "/data/movies/",
  createMovie: "/data/movies",
  getLikes: "/data/likes/",
  revokeLike: '/data/likes/'
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllMovies() {
  return api.getRequest(endpoints.getAllMovies);
}

export async function postMovie(data) {
  return api.postRequest(endpoints.createMovie, data);
}

export async function getById(id) {
  return api.getRequest(endpoints.getMovieById + id);
}

export async function updateById(id, data) {
  return api.putRequest(endpoints.getMovieById + id, data);
}

export async function deleteById(id) {
  return api.delRequest(endpoints.getMovieById + id);
}

export async function getLikes(id) {
  return api.getLikesRequest(
    `/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`
  );
}

export async function getUserLike(movieId, userId) {
  return api.getUserLikeRequest(
    `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
  );
}

export async function like(data) {
  return api.postLike(endpoints.getLikes, data);
}

export async function deleteLike(id) {
  return api.delLike(endpoints.revokeLike + id);
}