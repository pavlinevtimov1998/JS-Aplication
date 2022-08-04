import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemlate = () => html`
<!-- Login Page -->
<section id="login">
            <div class="container">
                <form id="login-form" action="#" method="post">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="#">Sign up</a>.
                    </p>
                </div>
            </div>
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
