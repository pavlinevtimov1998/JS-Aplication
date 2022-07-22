import { getAllTeams } from "../api/teams.js";
import { getAllMembers } from "../api/members.js";
import { html, until, nothing } from "../lib.js";

const catalogTemplate = (ctx, teams) => html`
  <section id="browse">
    <article class="pad-med">
      <h1>Team Browser</h1>
    </article>

    ${ctx.userData()
      ? html`<article class="layout narrow">
          <div class="pad-small">
            <a href="/create" class="action cta">Create Team</a>
          </div>
        </article>`
      : nothing}
    ${until(
      teams,
      html` <article class="pad-med">
        <h1>Loading &hellip;</h1>
      </article>`
    )}
  </section>
`;

const teamsTemplate = (team) => html`
  <article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col" />
    <div class="tm-preview">
      <h2>${team.name}</h2>
      <p>${team.description}</p>
      <span class="details">${team.members}</span>
      <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
  </article>
`;

export const catalogPage = (ctx) => {
  ctx.render(catalogTemplate(ctx, getTeams()));
};

async function getTeams() {
  const [teams, members] = await Promise.all([getAllTeams(), getAllMembers()]);

  teams.forEach((team) => {
    const countMembers = members.filter((m) => m.teamId == team._id);

    team.members = countMembers.length;
  });

  return teams.map((t) => teamsTemplate(t));
}
