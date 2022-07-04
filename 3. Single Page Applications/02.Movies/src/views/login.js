import { login } from "../api/data.js";

const loginPage = document.querySelector("#form-login");
const form = loginPage.querySelector("form");
let ctx;

export const showLogin = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  loginPage.style.display = "block";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = new FormData(form);

  let email = formData.get("email").trim();
  let password = formData.get("password").trim();

  if (email == "" || password == "") {
    return alert("Empty inputs");
  }

  await login(email, password);

  ctx.goTo("home", ctx);
  ctx.navAction(ctx.isUser());

  form.reset();
});
