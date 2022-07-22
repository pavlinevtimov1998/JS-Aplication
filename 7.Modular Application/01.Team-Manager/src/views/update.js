import { getTeamById, updateTeamById } from "../api/teams.js";
import { html, until, nothing } from "../lib.js";
import { notify } from "../notify.js";

const updateTemplate = (template) =>
  html`
    <section id="edit">
      ${until(
        template,
        html`<article class="narrow">
          <header class="pad-med">
            <h1>Loading &hellip;</h1>
          </header>
        </article>`
      )}
    </section>
  `;

const formTemplate = (onSubmit, team, errTemplate) => html`
  <article class="narrow">
    <header class="pad-med">
      <h1>Edit Team</h1>
    </header>
    <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
      ${errTemplate ? html`${errTemplate}` : nothing}
      <label
        >Team name: <input type="text" name="name" .value=${team.name}
      /></label>
      <label
        >Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}
      /></label>
      <label
        >Description:
        <textarea name="description" .value=${team.description}></textarea>
      </label>
      <input class="action cta" type="submit" value="Save Changes" />
    </form>
  </article>
`;

const errorTemplate = (message) => html` <div class="error">${message}</div>`;

export const updatePage = (ctx) => {
  ctx.render(updateTemplate(getTeam()));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name").trim();
    const logoUrl = formData.get("logoUrl").trim();
    const description = formData.get("description").trim();

    const team = { name, logoUrl, description };

    try {
      if (name.length < 4) {
        throw new Error("Team name should be at least 4 characters long!");
      }

      if (logoUrl == "") {
        throw new Error("Logo URL is required!");
      }

      if (description.length < 10) {
        throw new Error("Description should be at least 10 characters long!");
      }

      await updateTeamById(ctx.params.id, team);

      e.target.reset();
      ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (err) {
      notify(err.message);
      ctx.render(
        updateTemplate(formTemplate(onSubmit, team, errorTemplate(err.message)))
      );
    }
  }

  async function getTeam() {
    const team = await getTeamById(ctx.params.id);

    return formTemplate(onSubmit, team);
  }
};
