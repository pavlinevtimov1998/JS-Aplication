import { getUserTeamMembers } from "../api/members.js";
import { getTeamsByUserId } from "../api/teams.js";
import { html, until } from "../lib.js";

const userTeamsTemplate = (template) => html`
  <section id="my-teams">
    <article class="pad-med">
      <h1>My Teams</h1>
    </article>
    ${until(
      template,
      html`<article class="pad-med"><h1>Loading &hellip;</h1></article>`
    )}
  </section>
`;

const emptyDataTemplate = () => html`<article class="layout narrow">
  <div class="pad-med">
    <p>You are not a member of any team yet.</p>
    <p>
      <a href="/catalog">Browse all teams</a> to join one, or use the button
      bellow to cerate your own team.
    </p>
  </div>
  <div class=""><a href="/create" class="action cta">Create Team</a></div>
</article>`;

const dataTemplate = (team) => html`
  <article class="layout">
    <img src="${team.logoUrl}" class="team-logo left-col" />
    <div class="tm-preview">
      <h2>${team.name}</h2>
      <p>${team.description}</p>
      <span class="details">${team.members.length}</span>
      <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
  </article>
`;

export const userTeamsPage = (ctx) => {
  const user = ctx.userData();

  ctx.render(userTeamsTemplate(getUserTeams()));

  async function getUserTeams() {
    const data = await getTeamsByUserId(user.id);

    const teamIds = data.map((d) => {
      d.team.members = [];
      return d.teamId;
    });

    const members = await getUserTeamMembers(teamIds);

    members.forEach((m) =>
      data.find((d) => d.teamId == m.teamId).team.members.push(m)
    );

    return data.length
      ? data.map((d) => dataTemplate(d.team))
      : emptyDataTemplate();
  }
};
