import { createTeam } from "../api/teams.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html`
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
        <div class="error">Error message.</div>
        <label>Team name: <input type="text" name="name" /></label>
        <label>Logo URL: <input type="text" name="logoUrl" /></label>
        <label>Description: <textarea name="description"></textarea></label>
        <input class="action cta" type="submit" value="Create Team" />
      </form>
    </article>
  </section>
`;

export const createPage = (ctx) => {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const logoUrl = formData.get("logoUrl");
    const description = formData.get("description");

    if (name.length < 4) {
      return alert("Team name should be at least 4 characters!");
    }

    if (logoUrl == "") {
      return alert("All fields required!");
    }

    if (description.length < 10) {
      return alert("Description should be at least 10 characters!");
    }

    const data = await createTeam({ name, logoUrl, description });

    ctx.page.redirect(`/details/${data._id}`);
  }
};
