import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemplate = (onSubmit) => html`
  <section @submit=${(e) => onSubmit(e)} id="form-login" class="section">
    <form class="text-center border border-light p-5" action="" method="">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="Email"
          name="email"
          value=""
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="Password"
          name="password"
          value=""
        />
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
`;

export function loginPage(ctx, next) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get("email").trim();
    let password = formData.get("password").trim();

    if (email == "" || password == "") {
      return alert("Empty inputs");
    }

    await login(email, password);

    e.target.reset();

    ctx.navAction(ctx.userData());
    ctx.page.redirect("/home");
  }
}
