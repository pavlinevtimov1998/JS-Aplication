import { getTeamMembers } from "../../api/members.js";
import { getTeamById } from "../../api/teams.js";
import { html, until, nothing } from "../../lib.js";
import {
  onApprove,
  join,
  cancelMemberRequest,
  declineMemberRequest,
  removeMember,
} from "./membersAction.js";

const detailsTemplate = (team) => html`
  <section id="team-home">
    ${until(
      team,
      html`
        <article class="pad-med">
          <h1 style="font-size: 1.3rem">
            Loading &hellip;
          </h1>
        </article>
      `
    )}
  </section>
`;

const teamTemplate = (team, members, pendings, user, statements, ctx) => html`
  <article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col" />
    <div class="tm-preview">
      <h2>${team.name}</h2>
      <p>${team.description}</p>
      <span class="details">${statements.membersCount}</span>
      <div>
        ${user &&
        !statements.isOwner &&
        !statements.isPending &&
        !statements.isMember
          ? html`<a
              @click=${() => join(team._id)}
              href="/details/${team._id}"
              class="action"
              >Join team</a
            >`
          : nothing}
        ${user && statements.isOwner
          ? html`<a href="/edit/${ctx.params.id}" class="action">Edit team</a>`
          : nothing}
        ${user && statements.isMember && !statements.isOwner
          ? html`<a
              @click=${() => removeMember(statements.leaveTeam._id)}
              href="/details/${ctx.params.id}"
              class="action invert"
              >Leave team</a
            >`
          : nothing}
        ${user && statements.isPending
          ? html`Membership pending.
              <a
                @click=${() => cancelMemberRequest(statements.leaveTeam._id)}
                href="/details/${team._id}"
                >Cancel request</a
              >`
          : nothing}
      </div>
    </div>
    ${members ? html`${members}` : nothing}
    ${pendings && statements.statusPending.length > 0 && statements.isOwner
      ? html`${pendings}`
      : nothing}
  </article>
`;

const membersTemplate = (people, owner, user, ctx) => html` <div
  class="pad-large"
>
  <h3>Members</h3>
  <ul class="tm-members">
    <li>${owner.user.username}</li>
    ${people.map((p) => listMembersTemplate(p, owner, user, ctx))}
  </ul>
</div>`;

const listMembersTemplate = (person, owner, user, ctx) => html`
  <li>
    ${person.user.username}
    ${owner._ownerId == user.id
      ? html`<a
          @click=${() => removeMember(person._id)}
          href="/details/${ctx.params.id}"
          class="tm-control action"
          >Remove from team</a
        >`
      : nothing}
  </li>
`;

const approveTemplate = (people, statement, ctx) => html`
  <div class="pad-large">
    <h3>Membership Requests</h3>
    <ul class="tm-members">
      ${people.map((p) => approvePeopleTemplate(p, statement, ctx))}
    </ul>
  </div>
`;

const approvePeopleTemplate = (person, statement, ctx) => html` <li>
  ${person.user.username}
  ${statement
    ? html`<a
          @click=${(e) => onApprove(person)}
          href="/details/${ctx.params.id}"
          class="tm-control action"
          >Approve</a
        ><a
          @click=${() => declineMemberRequest(person._id)}
          href="/details/${ctx.params.id}"
          class="tm-control action"
          >Decline</a
        >`
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

    const statements = {
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
      leaveTeam: user ? people.find((p) => p.user._id == user.id) : false,
    };

    statements.isOwner = user && team._ownerId == user.id;
    statements.membersCount = statements.statusMember.length + 1; // + 1 because the owner is not in the list.

    return teamTemplate(
      team,
      membersTemplate(
        statements.statusMember,
        statements.owner,
        user || false,
        ctx
      ),
      approveTemplate(
        statements.statusPending,
        user && user.id == statements.owner._ownerId,
        ctx
      ),
      user,
      statements,
      ctx
    );
  }
};
