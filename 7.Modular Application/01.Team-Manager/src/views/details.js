import { getTeamMembers } from "../api/members.js";
import { getAllTeams } from "../api/teams.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (team) => html` <section id="team-home"></section> `;

const teamTemplate = (team, members, user) => html`
  <article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col" />
    <div class="tm-preview">
      <h2>${team.name}</h2>
      <p>${team.description}</p>
      <span class="details">3 Members</span>
      <div>
        ${user && user.id !== team._ownerId
          ? html`<a href="#" class="action">Join team</a>`
          : nothing}
        ${user && user == team._ownerId
          ? html`<a href="#" class="action">Edit team</a>`
          : nothing}
        <a href="#" class="action invert">Leave team</a>
        Membership pending. <a href="#">Cancel request</a>
      </div>
    </div>
    <div class="pad-large">
      <h3>Members</h3>
      <ul class="tm-members">
        <li>My Username</li>
        <li>James<a href="#" class="tm-control action">Remove from team</a></li>
        <li>
          Meowth<a href="#" class="tm-control action">Remove from team</a>
        </li>
      </ul>
    </div>
    <div class="pad-large">
      <h3>Membership Requests</h3>
      <ul class="tm-members">
        <li>
          John<a href="#" class="tm-control action">Approve</a
          ><a href="#" class="tm-control action">Decline</a>
        </li>
        <li>
          Preya<a href="#" class="tm-control action">Approve</a
          ><a href="#" class="tm-control action">Decline</a>
        </li>
      </ul>
    </div>
  </article>
`;

const itemTemplate = () => html``;

export const detailsPage = (ctx) => {
  ctx.render(detailsTemplate());

  async function getTeam() {
    const [team, members] = await Promise.all([
      getAllTeams(ctx.params.id),
      getTeamMembers(ctx.params.id),
    ]);

    const user = ctx.userData();

    return teamTemplate(team, members, user);
  }

  getTeam();
};
