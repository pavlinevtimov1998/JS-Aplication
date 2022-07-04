import * as api from './api.js';

const moviesUrl = "/data/movies/";
const likeUrl = "/data/likes/";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllMovies() {
    return api.getRequest(moviesUrl)
}

export async function postMovie(data) {
    return api.postRequest(moviesUrl, data);
}

export async function getById(id) {
    return api.getRequest(moviesUrl + id);
}

export async function updateById(id, data) {
    return api.putRequest(moviesUrl + id, data);
}

export async function deleteById(id) {
    return api.delRequest(moviesUrl + id);
}