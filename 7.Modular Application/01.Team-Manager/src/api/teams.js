import * as api from "./api.js";

const teamEndpoints = {
  createTeam: "/data/teams",
  getAllTeams: "/data/teams",
  getTeamById: "/data/teams/",
};

// GET REQUESTS

export const getAllTeams = async () => {
  return api.getRequest(teamEndpoints.getAllTeams);
};

export const getTeamById = async (id) => {
  return api.getRequest(teamEndpoints.getTeamById + id);
};

// POST REQUESTS

export const createTeam = async (data) => {
  return api.postRequest(teamEndpoints.createTeam, data);
};

// PUT REQUESTS

export const updateTeamById = async (id, data) => {
  return api.putRequest(teamEndpoints.getTeamById + id, data);
};

// DELETE REQUESTS

export const deleteTeamById = async (id) => {
  return api.delRequest(teamEndpoints.getTeamById + id);
};
