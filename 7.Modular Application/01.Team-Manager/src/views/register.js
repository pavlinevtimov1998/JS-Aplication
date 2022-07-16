import { register } from "../api/user.js";
import { html, nothing } from "../lib.js";

const registerTemplate = (onSubmit, message) => html`
  <section id="register">
    <article class="narrow">
      <header class="pad-med">
        <h1>Register</h1>
      </header>
      <form
        @submit=${(e) => onSubmit(e)}
        id="register-form"
        class="main-form pad-large"
      >
        ${message ? html`${message}` : nothing}
        <label>E-mail: <input type="text" name="email" /></label>
        <label>Username: <input type="text" name="username" /></label>
        <label>Password: <input type="password" name="password" /></label>
        <label>Repeat: <input type="password" name="repass" /></label>
        <input class="action cta" type="submit" value="Create Account" />
      </form>
      <footer class="pad-small">
        Already have an account?
        <a href="/login" class="invert">Sign in here</a>
      </footer>
    </article>
  </section>
`;

const errorTemplate = (message) => html`<div class="error">${message}</div>`;

export const registerPage = (ctx) => {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("repass").trim();

    try {
      if (email == "") {
        throw new Error("Email is required!");
      }
      if (username.length < 3) {
        throw new Error("Username should be at least 3 characters long!");
      }
      if (password.length < 3) {
        throw new Error("Password should be at least 3 characters long!");
      }
      if (password !== rePass) {
        throw new Error("Passwords don't match!");
      }

      await register(email, username, password);

      e.target.reset();

      ctx.navAction(ctx.userData());
      ctx.page.redirect("/myteams");
    } catch (err) {
      ctx.render(registerTemplate(onSubmit, errorTemplate(err.message)));
    }
  }
};
