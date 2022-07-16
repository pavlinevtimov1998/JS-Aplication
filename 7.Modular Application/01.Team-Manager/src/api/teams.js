import * as api from "./api.js";

const teamEndpoints = {
  createTeam: "/data/teams",
  getAllTeams: "/data/teams",
  getTeamById: "/data/teams/",
  getUserTeams: (userId) =>
    `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
};

// GET REQUESTS

export const getAllTeams = async () => {
  return api.getRequest(teamEndpoints.getAllTeams);
};

export const getTeamById = async (id) => {
  return api.getRequest(teamEndpoints.getTeamById + id);
};

export const getTeamsByUserId = async (id) => {
  return api.getRequest(teamEndpoints.getUserTeams(id));
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
