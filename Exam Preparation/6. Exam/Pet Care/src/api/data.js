import * as api from "./api.js";
import * as users from "./users.js";

const endpoints = {
  getAll: "/data/pets?sortBy=_createdOn%20desc&distinct=name",
  getOne: "/data/pets/",
  create: "/data/pets",
  donation: "/data/donation",
  totalDonation: (petId) =>
    `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
  specificUserDonation: (petId, userId) =>
    `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count `,
};

//136777f5-3277-42ad-b874-76d043b069cb

export const login = users.login;
export const register = users.register;
export const logout = users.logout;

export const getAll = () => {
  return api.getRequest(endpoints.getAll);
};

export const getOne = (id) => {
  return api.getRequest(endpoints.getOne + id);
};

export const createAnimal = (data) => {
  return api.postRequest(endpoints.create, data);
};

export const editAnimal = (id, data) => {
  return api.putRequest(endpoints.getOne + id, data);
};

export const delAnimal = (id) => {
  return api.delRequest(endpoints.getOne + id);
};

// Donation

export const getDonations = (petId) => {
  return api.getRequest(endpoints.totalDonation(petId));
};

export const makeDonation = (data) => {
  return api.postRequest(endpoints.donation, data);
};

export const getSpecificDonation = (petId, userId) => {
  return api.getRequest(endpoints.specificUserDonation(petId, userId));
};
