import { login } from "../api/data.js";

const loginPage = document.querySelector("#login-page");

let ctx;

export const showLogin = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  loginPage.style.display = "block";
};

loginPage.querySelector("form").addEventListener("submit", onLogin);

async function onLogin(e) {
  e.preventDefault();

  let form = e.currentTarget;

  const dataForm = new FormData(form);

  const [email, password, rePass] = [...dataForm.values()];

  if (email.length == 0 || password.length == 0) {
    return alert("All fields required!");
  }

  await login(email, password);

  form.reset();

  ctx.hideAll();
  ctx.navAction();
  ctx.goTo("home", ctx);
}
