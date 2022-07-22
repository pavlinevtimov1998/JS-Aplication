import { login } from "../api/user.js";
import { html, nothing } from "../lib.js";
import { notify } from "../notify.js";

const loginTemlate = (onSubmit, message) => html`
  <section id="login">
    <article class="narrow">
      <header class="pad-med">
        <h1>Login</h1>
      </header>
      <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
        ${message ? html`${message}` : nothing}
        <label>E-mail: <input type="text" name="email" /></label>
        <label>Password: <input type="password" name="password" /></label>
        <input class="action cta" type="submit" value="Sign In" />
      </form>
      <footer class="pad-small">
        Don't have an account?
        <a href="/register" class="invert">Sign up here</a>
      </footer>
    </article>
  </section>
`;

const errorTemplate = (message) => html`<div class="error">${message}</div>`;

export const loginPage = (ctx) => {
  ctx.render(loginTemlate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    try {
      if (email == "" || password == "") {
        throw new Error("All fields required!");
      }

      await login(email, password);

      e.target.reset();

      ctx.navAction(ctx.userData());
      ctx.page.redirect("/myteams");
    } catch (err) {
      notify(err.message);
      ctx.render(loginTemlate(onSubmit, errorTemplate(err.message)));
    }
  }
};
