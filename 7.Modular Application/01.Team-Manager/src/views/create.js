import { approveMember, createMember } from "../api/members.js";
import { createTeam } from "../api/teams.js";
import { html, nothing } from "../lib.js";

const createTemplate = (onSubmit, message) => html`
  <section id="create">
    <article class="narrow">
      <header class="pad-med">
        <h1>New Team</h1>
      </header>
      <form
        @submit=${(e) => onSubmit(e)}
        id="create-form"
        class="main-form pad-large"
      >
        ${message ? html`${message}` : nothing}
        <label>Team name: <input type="text" name="name" /></label>
        <label>Logo URL: <input type="text" name="logoUrl" /></label>
        <label>Description: <textarea name="description"></textarea></label>
        <input class="action cta" type="submit" value="Create Team" />
      </form>
    </article>
  </section>
`;

const errTemplate = (message) => html`<div class="error">${message}</div>`;

export const createPage = (ctx) => {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name").trim();
    const logoUrl = formData.get("logoUrl").trim();
    const description = formData.get("description").trim();

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

      const data = await createTeam({ name, logoUrl, description });
      const owner = await createMember({ teamId: data._id });
      owner.status = "member";
      await approveMember(owner._id, owner);

      e.target.reset();
      ctx.page.redirect(`/details/${data._id}`);
    } catch (err) {
      ctx.render(createTemplate(onSubmit, errTemplate(err.message)));
    }
  }
};
