import { html } from "../lib.js";
import { register } from "../api/data.js";
import { userData } from "../util.js";

const registerTemplate = (onSubmit, message) => html`
  <div id="register-page" class="container home wrapper my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal">
      <div class="col-md-4">
        <img class="responsive" src="./images/idea.png" alt="" />
      </div>
      <form
        @submit=${(e) => onSubmit(e)}
        class="form-user col-md-7"
        action=""
        method=""
      >
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
        </div>
        ${message ? html`<p class="error">${message}</p>` : null}
        <div class="form-label-group">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            class="form-control"
            placeholder="Email"
            required=""
            autofocus=""
          />
        </div>
        <div class="form-label-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            placeholder="Password"
            required=""
          />
        </div>
        <div class="form-label-group">
          <label for="inputRepeatPassword">Repeat Password</label>
          <input
            type="password"
            id="inputRepeatPassword"
            name="repeatPassword"
            class="form-control"
            placeholder="Repeat Password"
            required=""
          />
        </div>
        <button class="btn btn-lg btn-dark btn-block" type="submit">
          Sign Up
        </button>
        <div class="text-center mb-4">
          <p class="alreadyUser">
            Don't have account? Then just <a href="">Sign-In</a>!
          </p>
        </div>
        <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
      </form>
    </div>
  </div>
`;

export const showRegister = (ctx) => {
  update();

  function update(message) {
    ctx.render(registerTemplate(onSubmit, message));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const dataForm = new FormData(e.target);

    const email = dataForm.get("email").trim();
    const password = dataForm.get("password").trim();
    const rePass = dataForm.get("repeatPassword").trim();

    try {
      if (email.length < 3) {
        throw new Error("Email should be at least 3 characters!");
      }

      if (password.length < 3) {
        throw new Error("Password should be at least 3 characters!");
      }

      if (password !== rePass) {
        throw new Error("Passwords don't match!");
      }

      await register(email, password);

      e.target.reset();

      ctx.navAction(userData());
      ctx.page.redirect("/home");
    } catch (err) {
      update(err.message);
    }
  }
};
