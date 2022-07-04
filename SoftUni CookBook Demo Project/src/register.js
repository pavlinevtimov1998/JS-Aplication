import { register } from "./api/data.js";

const registerSection = document.querySelector("#register");

let ctx;

export const showRegister = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  registerSection.style.display = "block";
};

const form = document.querySelector(".register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.currentTarget);
  let email = data.get("email").trim();
  let password = data.get("password").trim();
  let rePass = data.get("rePass").trim();

  if (password !== rePass) {
    return console.error("Passwords don't match");
  }

  await register(email, password);

  ctx.userNavigation();
  ctx.goTo("catalog", ctx);
});
