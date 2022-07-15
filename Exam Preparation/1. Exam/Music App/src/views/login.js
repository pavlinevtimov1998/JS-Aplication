import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemlate = (onSubmit) => html`
  <section id="loginPage">
    <form @submit=${(e) => onSubmit(e)}>
      <fieldset>
        <legend>Login</legend>

        <label for="email" class="vhide">Email</label>
        <input
          id="email"
          class="email"
          name="email"
          type="text"
          placeholder="Email"
        />

        <label for="password" class="vhide">Password</label>
        <input
          id="password"
          class="password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <button type="submit" class="login">Login</button>

        <p class="field">
          <span>If you don't have profile click <a href="#">here</a></span>
        </p>
      </fieldset>
    </form>
  </section>
`;

export const loginPage = (ctx) => {
  ctx.render(loginTemlate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    await login(email, password);

    ctx.navAction(ctx.userData());
    ctx.page.redirect("/home");
  }
};
