import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  getAll: "/data/offers?sortBy=_createdOn%20desc",
  create: "/data/offers",
  getOne: "/data/offers/",
  apply: "/data/applications",
  totalApplications: (offerId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
  specificApplication: (offerId, userId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAllOffers = () => {
  return api.getRequest(endpoints.getAll);
};

export const createOffer = (data) => {
  return api.postRequest(endpoints.create, data);
};

export const getOneOffer = (id) => {
  return api.getRequest(endpoints.getOne + id);
};

export const editOffer = (id, data) => {
  return api.putRequest(endpoints.getOne + id, data);
};

export const deleteOffer = (id) => {
  return api.delRequest(endpoints.getOne + id);
};

export const addApplication = (data) => {
  return api.postRequest(endpoints.apply, data);
};

export const getAllApplications = (offerId) => {
  return api.getRequest(endpoints.totalApplications(offerId));
};

export const getSpecificApp = (offerId, userId) => {
  return api.getRequest(endpoints.specificApplication(offerId, userId));
};
