import * as api from "./api.js";

const endpoints = {
  like: "/data/likes/",
  countLikes: (id) =>
    `/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId`,
  specifikLike: (movieId, userId) =>
    `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`,
};

export async function getLikes(id) {
  return api.getRequest(endpoints.countLikes(id));
}

export async function getSpecificUserLike(movieId, userId) {
  return api.getRequest(endpoints.specifikLike(movieId, userId));
}

export async function createLike(data) {
  return api.postRequest(endpoints.like, data);
}

export async function deleteLike(id) {
  return api.delRequest(endpoints.like + id);
}
