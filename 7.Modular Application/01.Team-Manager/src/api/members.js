import * as api from "./api.js";

export const membersEndpoints = {
  getAllMembers: "/data/members?where=status%3D%22member%22",
  becomeMember: "/data/members",
  approvingMembership: "/data/members/",
  removeMember: "/data/members/",
  getAllTeamMembers: (teamId) =>
    `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,
  getUserTeamMembers: (data) =>
    `/data/members?where=${encodeURIComponent(
      `teamId IN ("${data.join('","')}") AND status="member"`
    )}`,
};

// GET REQUESTS
export const getAllMembers = async () => {
  return api.getRequest(membersEndpoints.getAllMembers);
};

export const getTeamMembers = async (id) => {
  return api.getRequest(membersEndpoints.getAllTeamMembers(id));
};

export const getUserTeamMembers = async (data) => {
  // console.log(membersEndpoints.getUserTeamMembers(data));
  return api.getRequest(membersEndpoints.getUserTeamMembers(data));
};

// POST REQUESTS
export const createMember = async (data) => {
  return await api.postRequest(membersEndpoints.becomeMember, data);
};

// PUT REQUESTS
export const approveMember = async (id, data) => {
  return api.putRequest(membersEndpoints.approvingMembership + id, data);
};

// DELETE REQUESTS
export const deleteMemberById = async (id) => {
  return api.delRequest(membersEndpoints.removeMember + id);
};
