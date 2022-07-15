import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
  <section id="registerPage">
    <form @submit=${(e) => onSubmit(e)}>
      <fieldset>
        <legend>Register</legend>

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

        <label for="conf-pass" class="vhide">Confirm Password:</label>
        <input
          id="conf-pass"
          class="conf-pass"
          name="conf-pass"
          type="password"
          placeholder="Confirm Password"
        />

        <button type="submit" class="register">Register</button>

        <p class="field">
          <span>If you already have profile click <a href="#">here</a></span>
        </p>
      </fieldset>
    </form>
  </section>
`;

export const registerPage = (ctx) => {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("conf-pass").trim();

    if (email == "" || password == "" || password !== rePass) {
      return alert("Invalid fields!");
    }

    await register(email, password);

    ctx.navAction(ctx.userData());
    ctx.page.redirect("/home");
  }
};
