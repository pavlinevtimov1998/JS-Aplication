import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemlate = () => html`
 <!--Login Page-->
 <section id="loginPage">
            <form class="loginForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </form>
        </section>
`;

export const loginPage = (ctx) => {
  ctx.render(loginTemlate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault(loginTemlate(onSubmit));

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (email == "" || password == "") {
      return alert("All fields required!");
    }

    await login(email, password);

    ctx.navAction(ctx.userData());
    ctx.page.redirect("");
  }
};
