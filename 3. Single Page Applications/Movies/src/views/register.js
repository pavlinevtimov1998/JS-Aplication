import { register } from "../api/data.js";

const registerPage = document.querySelector("#form-sign-up");
const form = registerPage.querySelector("form");
let ctx;

export const showRegister = (ctxTarget) => {
  ctx = ctxTarget;
  registerPage.style.display = "block";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let [email, password, rePass] = [...formData.values()];

  if (email == "" || password.length < 6 || password !== rePass) {
    return alert("Incorrect input");
  }

  const user = await register(email, password);

  form.reset();

  ctx.goTo("home", ctx);
  ctx.navAction(ctx.isUser());
});
