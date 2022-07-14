import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit, errMessage, errors) => html`
  <div class="container">
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Register New User</h1>
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
              class=${"form-control" + (errors.email ? " is-invalid" : "")}
              id="email"
              type="text"
              name="email"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input
              class=${"form-control" + (errors.password ? " is-invalid" : "")}
              id="password"
              type="password"
              name="password"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="rePass">Repeat</label>
            <input
              class=${"form-control" + (errors.rePass ? " is-invalid" : "")}
              id="rePass"
              type="password"
              name="rePass"
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Register" />
        </div>
      </div>
    </form>
  </div>
`;

export const registerPage = (ctx) => {
  update(null, {});

  function update(errMessage, errors) {
    ctx.render(registerTemplate(onSubmit, errMessage, errors));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("rePass").trim();

    try {
      if (email == "" || password == "" || rePass == "") {
        throw {
          error: new Error("All fields required!"),
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
            password: true,
            email: true,
          },
        };
      }

      await register(email, password);

      ctx.navAction(ctx.userData());
      ctx.page.redirect("/catalog");
    } catch (err) {
      const message = err.message || err.error.message;
      update(message, err.errors || {});
    }
  }
};
