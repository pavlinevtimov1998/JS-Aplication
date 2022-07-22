import {
  approveMember,
  createMember,
  deleteMemberById,
} from "../../api/members.js";

export async function onApprove(person) {
  person.status = "member";
  await approveMember(person._id, person);
}

export async function join(teamId) {
  await createMember({ teamId });
}

export async function cancelMemberRequest(id) {
  await deleteMemberById(id);
}

export async function declineMemberRequest(id) {
  await deleteMemberById(id);
}

export async function removeMember(id) {
  await deleteMemberById(id);
}
