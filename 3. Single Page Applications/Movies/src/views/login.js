import { login } from "../api/data.js";
import { html, styleMap } from "../lib.js";
import { showNotify } from "../notify.js";

const loginTemplate = (onSubmit, errors) => html`
  <section @submit=${(e) => onSubmit(e)} id="form-login" class="section">
    <form class="text-center border border-light p-5" action="" method="">
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

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
`;

export function loginPage(ctx) {
  update({});

  function update(errors) {
    ctx.render(loginTemplate(onSubmit, errors));
  }

  async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get("email").trim();
    let password = formData.get("password").trim();

    try {
      if (email == "" || password == "") {
        throw {
          error: new Error("All fields are required!"),
          errors: {
            email: email == "",
            password: password == "",
          },
        };
      }

      await login(email, password);

      e.target.reset();

      ctx.navAction(ctx.userData());
      ctx.page.redirect("/home");
    } catch (err) {
      showNotify(err.error || err);
      update(err.errors || {});
    }
  }
}
