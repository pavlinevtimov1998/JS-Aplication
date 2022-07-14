import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemlate = (onSubmit, errMessage) => html`
  <div class="container">
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
      </div>
    </div>
    ${errMessage
      ? html`<div class="form-group error">${errMessage}</div>`
      : null}
    <form @submit=${(e) => onSubmit(e)}>
      <div class="row space-top">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input
              class=${"form-control" + (errMessage ? " is-invalid" : "")}
              id="email"
              type="text"
              name="email"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input
              class=${"form-control" + (errMessage ? " is-invalid" : "")}
              id="password"
              type="password"
              name="password"
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Login" />
        </div>
      </div>
    </form>
  </div>
`;

export const loginPage = (ctx) => {
  update();

  function update(errMessage) {
    ctx.render(loginTemlate(onSubmit, errMessage));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    try {
      await login(email, password);
      ctx.navAction(ctx.userData());
      ctx.page.redirect("/catalog");
    } catch (err) {
      update(err.message);
    }
  }
};
