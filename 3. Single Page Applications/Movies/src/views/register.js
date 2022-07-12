import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
  <section id="form-sign-up" class="section">
    <form
      @submit=${(e) => onSubmit(e)}
      class="text-center border border-light p-5"
      action="#"
      method="post"
    >
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

      <div class="form-group">
        <label for="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          type="password"
          class="form-control"
          placeholder="Repeat-Password"
          name="repeatPassword"
          value=""
        />
      </div>

      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let [email, password, rePass] = [...formData.values()];

    if (email == "" || password.length < 6 || password !== rePass) {
      return alert("Incorrect input");
    }

    await register(email, password);

    e.target.reset();

    ctx.navAction(ctx.userData());
    ctx.page.redirect("/home");
  }
}
