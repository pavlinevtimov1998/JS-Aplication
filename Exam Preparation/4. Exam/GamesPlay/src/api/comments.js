import * as api from "./api.js";

const commentEndpoinds = {
  allComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
  postComment: "/data/comments",
};

export const getAllComments = async (gameId) => {
  return await api.getRequest(commentEndpoinds.allComments(gameId));
};

export const postComment = async (data) => {
  return await api.postRequest(commentEndpoinds.postComment, data);
};
