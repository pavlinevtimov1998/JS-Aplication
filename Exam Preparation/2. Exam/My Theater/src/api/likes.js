import * as api from "./api.js";

const likeEndpoints = {
  createLike: "/data/likes",
  countLikesForTheater: (theaterId) =>
    `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
  specificUserLike: (theaterId, userId) =>
    `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

// GET REQUESTS

export const getCountLikes = async (theaterId) => {
  return await api.getRequest(likeEndpoints.countLikesForTheater(theaterId));
};

export const getSpecificUserLike = async (theaterId, userId) => {
  return await api.getRequest(
    likeEndpoints.specificUserLike(theaterId, userId)
  );
};

// POST REQUESTS

export const createLike = async (data) => {
  return await api.postRequest(likeEndpoints.createLike, data);
};
