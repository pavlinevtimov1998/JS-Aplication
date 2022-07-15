import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
  <section id="register">
    <article class="narrow">
      <header class="pad-med">
        <h1>Register</h1>
      </header>
      <form @submit=${e => onSubmit(e)} id="register-form" class="main-form pad-large">
        <div class="error">Error message.</div>
        <label>E-mail: <input type="text" name="email" /></label>
        <label>Username: <input type="text" name="username" /></label>
        <label>Password: <input type="password" name="password" /></label>
        <label>Repeat: <input type="password" name="repass" /></label>
        <input class="action cta" type="submit" value="Create Account" />
      </form>
      <footer class="pad-small">
        Already have an account? <a href="/login" class="invert">Sign in here</a>
      </footer>
    </article>
  </section>
`;

export const registerPage = (ctx) => {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const username = formData.get('username').trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("repass").trim();

    if(email.length == '' || username.length < 3 || password.length < 3) {
      return alert('Wrong input!');
    }

    await register(email, password);

    ctx.page.redirect('/myteams');
  }
};
