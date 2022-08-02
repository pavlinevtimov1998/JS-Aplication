import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = () => html``;

export const registerPage = (ctx) => {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    
    //const rePass = formData.get("").trim(); 

    if (email == "" || password == "" || password !== rePass) {
      return alert("All fields required!");
    }

    await register(email, password);

    // ctx.navAction(ctx.userData());
    // ctx.page.redirect();
  }
};
