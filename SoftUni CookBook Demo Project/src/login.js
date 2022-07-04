import { login } from "./api/data.js";

const loginSection = document.querySelector("#login");
const form = document.querySelector(".login-form");

let ctx;

export const showLogin = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  loginSection.style.display = "block";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.currentTarget);
  const email = data.get("email").trim();
  const password = data.get("password").trim();

  await login(email, password);
  ctx.userNavigation();
  ctx.goTo("catalog", ctx);
});
