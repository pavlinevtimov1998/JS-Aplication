import { approveMember, createMember } from "../../api/members.js";

export async function onApprove(person, ctx) {
  person.status = "member";
  await approveMember(person._id, person);

  ctx.page.redirect(`/details/${ctx.params.id}`);
}

export async function join(e, teamId) {
  await createMember({ teamId });
}
