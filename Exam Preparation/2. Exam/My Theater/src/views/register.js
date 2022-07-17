import { html } from "../lib.js";

const registerTemplate = () => html`
  <section id="registerPage">
    <form class="registerForm">
      <h2>Register</h2>
      <div class="on-dark">
        <label for="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="steven@abv.bg"
          value=""
        />
      </div>

      <div class="on-dark">
        <label for="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value=""
        />
      </div>

      <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          placeholder="********"
          value=""
        />
      </div>

      <button class="btn" type="submit">Register</button>

      <p class="field">
        <span>If you have profile click <a href="#">here</a></span>
      </p>
    </form>
  </section>
`;

export const registerPage = (ctx) => {
  ctx.render(registerTemplate());

  // async function onSubmit(e) {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);

  //   const email = formData.get("email").trim();
  //   const password = formData.get("password").trim();
  //   const rePass = formData.get("rePass").trim();
  // }
};
