import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  getAll: "/data/books?sortBy=_createdOn%20desc",
  getOne: "/data/books/",
  create: "/data/books",
  getUserBooks: (userId) =>
    `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  like: "/data/likes",
  countLikes: (bookId) =>
    `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
  specificUserLike: (bookId, userId) =>
    `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAll = async () => {
  return api.getRequest(endpoints.getAll);
};

export const getOne = async (id) => {
  return api.getRequest(endpoints.getOne + id);
};

export const getUserBooks = async (userId) => {
  return api.getRequest(endpoints.getUserBooks(userId));
};

export const createBook = (book) => {
  return api.postRequest(endpoints.create, book);
};

export const editBook = (id, book) => {
  return api.putRequest(endpoints.getOne + id, book);
};

export const deleteBook = (bookId) => {
  return api.delRequest(endpoints.getOne + bookId);
};

// Likes

export const createLike = (data) => {
  return api.postRequest(endpoints.like, data);
};

export const getLikes = (bookId) => {
  return api.getRequest(endpoints.countLikes(bookId));
};

export const getSpecifikLike = (bookId, userId) => {
  return api.getRequest(endpoints.specificUserLike(bookId, userId));
};
