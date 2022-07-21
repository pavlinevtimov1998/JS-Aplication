import { register } from "../api/data.js";
import { html, styleMap } from "../lib.js";
import { showNotify } from "../notify.js";

const registerTemplate = (onSubmit, errors) => html`
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
          style=${styleMap(
            errors.email ? { backgroundColor: "rgb(255, 236, 236)" } : ""
          )}
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
          style=${styleMap(
            errors.password ? { backgroundColor: "rgb(255, 236, 236)" } : ""
          )}
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
          style=${styleMap(
            errors.rePass ? { backgroundColor: "rgb(255, 236, 236)" } : ""
          )}
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
  update({});

  function update(errors) {
    ctx.render(registerTemplate(onSubmit, errors));
  }

  async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let [email, password, rePass] = [...formData.values()];

    try {
      if (email == "" || password.length == "") {
        throw {
          error: new Error("All fields are required!"),
          errors: {
            email: email == "",
            password: password == "",
            rePass: rePass == "",
          },
        };
      }
      if (password !== rePass) {
        throw {
          error: new Error("Passwords don't match!"),
          errors: {
            email: false,
            password: true,
            rePass: true,
          },
        };
      }

      await register(email, password);

      e.target.reset();

      ctx.navAction(ctx.userData());
      ctx.page.redirect("/home");
    } catch (err) {
      showNotify(err.error || err);
      update(err.errors || {});
    }
  }
}
