import * as api from "./api.js";

const dashboardUrl =
  "/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export const getAllIdeas = async () => {
    return api.getRequest(dashboardUrl);
}