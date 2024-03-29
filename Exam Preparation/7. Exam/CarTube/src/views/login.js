import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemlate = (onSubmit) => html`
  <section id="login">
    <div class="container">
      <form @submit=${onSubmit} id="login-form" action="#" method="post">
        <h1>Login</h1>
        <p>Please enter your credentials.</p>
        <hr />

        <p>Username</p>
        <input placeholder="Enter Username" name="username" type="text" />

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" />
        <input type="submit" class="registerbtn" value="Login" />
      </form>
      <div class="signin">
        <p>Dont have an account? <a href="/register">Sign up</a>.</p>
      </div>
    </div>
  </section>
`;

export const loginPage = (ctx) => {
  ctx.render(loginTemlate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault(loginTemlate(onSubmit));

    const formData = new FormData(e.target);

    const username = formData.get("username").trim();
    const password = formData.get("password").trim();

    if (username == "" || password == "") {
      return alert("All fields required!");
    }

    await login(username, password);

    ctx.navAction(ctx.userData());
    ctx.page.redirect("/catalog");
  }
};
