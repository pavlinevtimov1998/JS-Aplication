import * as api from "./api.js";

const dashboardUrl =
  "/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc";
const ideaUrl = "/data/ideas/";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export const getAllIdeas = async () => {
  return api.getRequest(dashboardUrl);
};

export const createIdea = async (data) => {
  return api.postRequest(ideaUrl, data);
};

export const getWithId = async (id) => {
  return api.getRequest(ideaUrl + id);
};

export const deleteById = async (id) => {
  return api.delRequest(ideaUrl + id);
};
