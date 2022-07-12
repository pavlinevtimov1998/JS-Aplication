import { login } from "../api/data.js";
import { html } from "../lib.js";


const loginTemplate = () => html`
<section id="form-login" class="section">
    <form class="text-center border border-light p-5" action="" method="">
        <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
    </section>
`;

export function loginPage(ctx) {
  ctx.render(loginTemplate());
}

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   let formData = new FormData(form);

//   let email = formData.get("email").trim();
//   let password = formData.get("password").trim();

//   if (email == "" || password == "") {
//     return alert("Empty inputs");
//   }

//   await login(email, password);

//   ctx.goTo("home", ctx);
//   ctx.navAction(ctx.isUser());

//   form.reset();
// });
