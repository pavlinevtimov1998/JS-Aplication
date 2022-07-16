import { getTeamMembers } from "../../api/members.js";
import { getTeamById } from "../../api/teams.js";
import { html, until, nothing } from "../../lib.js";
import { onApprove, join } from "./membersAction.js";

const detailsTemplate = (team) => html`
  <section id="team-home">
    ${until(team, html`<p>Loading &hellip;</p>`)}
  </section>
`;

const teamTemplate = (team, members, pendings, user, steatments) => html`
  <article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col" />
    <div class="tm-preview">
      <h2>${team.name}</h2>
      <p>${team.description}</p>
      <span class="details">${steatments.count}</span>
      <div>
        ${user && !steatments.isOwner && !steatments.isPending
          ? html`<a
              @click=${(e) => join(e, team._id)}
              href="/details/${team._id}"
              class="action"
              >Join team</a
            >`
          : nothing}
        ${user && steatments.isOwner
          ? html`<a href="#" class="action">Edit team</a>`
          : nothing}
        ${user && steatments.isMember && !steatments.isOwner
          ? html`<a href="#" class="action invert">Leave team</a>`
          : nothing}
        ${user && steatments.isPending
          ? html`Membership pending.
              <a href="javascript:void(0)">Cancel request</a>`
          : nothing}
      </div>
    </div>
    ${members ? html`${members}` : nothing}
    ${pendings && steatments.isOwner ? html`${pendings}` : nothing}
  </article>
`;

const membersTemplate = (people, owner, user) => html` <div class="pad-large">
  <h3>Members</h3>
  <ul class="tm-members">
    <li>${owner.user.username}</li>
    ${people.map((p) => listMembersTemplate(p, owner, user))}
  </ul>
</div>`;

const listMembersTemplate = (person, owner, user) => html`
  <li>
    ${person.user.username}
    ${owner._ownerId == user.id
      ? html`<a href="javascript:void(0)" class="tm-control action"
          >Remove from team</a
        >`
      : nothing}
  </li>
`;

const approveTemplate = (people, steatment, ctx) => html`
  <div class="pad-large">
    <h3>Membership Requests</h3>
    <ul class="tm-members">
      ${people.map((p) => approvePeopleTemplate(p, steatment, ctx))}
    </ul>
  </div>
`;

const approvePeopleTemplate = (person, steatment, ctx) => html` <li>
  ${person.user.username}
  ${steatment
    ? html`<a
          @click=${(e) => onApprove(person, ctx)}
          href="javascript:void(0)"
          class="tm-control action"
          >Approve</a
        ><a href="javascript:void(0)" class="tm-control action">Decline</a>`
    : nothing}
</li>`;

export const detailsPage = (ctx) => {
  ctx.render(detailsTemplate(getTeam()));

  async function getTeam() {
    const user = ctx.userData();

    const [team, people] = await Promise.all([
      getTeamById(ctx.params.id),
      getTeamMembers(ctx.params.id),
    ]);

    const members = {
      statusMember: people.filter(
        (p) => p.status == "member" && team._ownerId !== p._ownerId
      ),
      statusPending: people.filter((p) => p.status == "pending"),
      isPending: people.some(
        (p) => user && p._ownerId == user.id && p.status == "pending"
      ),
      isMember: people.some(
        (p) => user && p._ownerId == user.id && p.status == "member"
      ),
      owner: people.find((p) => p._ownerId == team._ownerId),
    };

    members.isOwner = user && team._ownerId == user.id;
    members.count = members.statusMember.length + 1;

    return teamTemplate(
      team,
      membersTemplate(members.statusMember, members.owner, user || false),
      approveTemplate(
        members.statusPending,
        user && user.id == members.owner._ownerId,
        ctx
      ),
      user,
      members,
      ctx
    );
  }
};
