import { register } from "../api/data.js";

const registerPage = document.querySelector("#register-page");

let ctx;

export const showRegister = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  registerPage.style.display = 'block';
};

console.log(registerPage);

registerPage.querySelector("form").addEventListener("submit", onRegister);

async function onRegister(e) {
  e.preventDefault();

  let form = e.currentTarget;

  const dataForm = new FormData(form);

  const [email, password, rePass] = [...dataForm.values()];

  if (email.length < 3) {
    return alert("Email should be at least 3 characters!");
  }

  if (password.length < 3) {
    return alert("Password should be at least 3 characters!");
  }

  if (password !== rePass) {
    return alert("Passwords don't match!");
  }

  await register(email, password);

  form.reset();

  ctx.hideAll();
  ctx.navAction();
  ctx.goTo('home', ctx);
}
