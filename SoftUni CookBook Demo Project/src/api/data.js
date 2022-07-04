const loadAllUrl = `/data/recipes?select=_id%2Cname%2Cimg`;
const detailsRecipeUrl = `/data/recipes/`;
const createRecipeUrl = `/data/recipes/`;

import * as api from "./api-calls.js";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export const loadAllRecipes = async () => {
  return api.getRequest(loadAllUrl);
};

export const getDetails = async (id) => {
  return api.getRequest(detailsRecipeUrl + id);
};

export const createRecipe = async (data) => {
  return api.postRequest(createRecipeUrl, data);
};

export const updateRecipe = async (id, data) => {
  return api.putRequest(createRecipeUrl + id, data);
};

export const deleteRecipe = async (id) => {
  return api.delRequest(detailsRecipeUrl + id);
};
