import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
  <section id="register">
    <div class="container">
      <form @submit=${onSubmit} id="register-form">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <p>Username</p>
        <input type="text" placeholder="Enter Username" name="username" />

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" />

        <p>Repeat Password</p>
        <input
          type="password"
          placeholder="Repeat Password"
          name="repeatPass"
        />
        <hr />

        <input type="submit" class="registerbtn" value="Register" />
      </form>
      <div class="signin">
        <p>Already have an account? <a href="#">Sign in</a>.</p>
      </div>
    </div>
  </section>
`;

export const registerPage = (ctx) => {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get("username").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("repeatPass").trim();

    console.log(username, password, rePass);

    if (username == "" || password == "" || password !== rePass) {
      return alert("All fields required!");
    }

    await register(username, password);

    ctx.navAction(ctx.userData());
    ctx.page.redirect("/catalog");
  }
};
