import { register } from "../api/data.js";

const registerPage = document.querySelector("#register-page");
registerPage.remove();
let ctx;

export const showRegister = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.showSection(registerPage);
};

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

  ctx.navAction();
  ctx.goTo("home", ctx);
}
