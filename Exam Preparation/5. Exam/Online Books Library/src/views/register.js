import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
  <section id="register-page" class="register">
    <form @submit=${onSubmit} id="register-form" action="" method="">
      <fieldset>
        <legend>Register Form</legend>
        <p class="field">
          <label for="email">Email</label>
          <span class="input">
            <input type="text" name="email" id="email" placeholder="Email" />
          </span>
        </p>
        <p class="field">
          <label for="password">Password</label>
          <span class="input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </span>
        </p>
        <p class="field">
          <label for="repeat-pass">Repeat Password</label>
          <span class="input">
            <input
              type="password"
              name="confirm-pass"
              id="repeat-pass"
              placeholder="Repeat Password"
            />
          </span>
        </p>
        <input class="button submit" type="submit" value="Register" />
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
    const rePass = formData.get("confirm-pass").trim();

    if (email == "" || password == "" || password !== rePass) {
      return alert("All fields required!");
    }

    await register(email, password);

    ctx.navAction(ctx.userData());
    ctx.page.redirect("/");
  }
};
