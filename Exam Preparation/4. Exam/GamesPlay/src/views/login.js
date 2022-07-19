import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemlate = (onSubmit) => html`
  <section id="login-page" class="auth">
    <form @submit=${onSubmit} id="login">
      <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Sokka@gmail.com"
        />

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password" />
        <input type="submit" class="btn submit" value="Login" />
        <p class="field">
          <span>If you don't have profile click <a href="#">here</a></span>
        </p>
      </div>
    </form>
  </section>
`;

export const loginPage = (ctx) => {
  ctx.render(loginTemlate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault(loginTemlate(onSubmit));

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (email == "" || password == "") {
      return alert("All fields required!");
    }

    await login(email, password);

    ctx.navAction(ctx.userData());
    ctx.page.redirect("");
  }
};
