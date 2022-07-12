import { logout } from "./api/data.js";
import { render, page } from "./lib.js";
import { loadMovie, navAction, userData } from "./util.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("main");
document.querySelector("#logout").addEventListener("click", onLogout);

page(decorateContext);
page("/home", homePage);
page("/create", createPage);
page("/details/:id", loadMovie, detailsPage);
page("/login", loginPage);
page("/register", registerPage);
page("/edit/:id", loadMovie, editPage);

page("", "/home");

page.start();

async function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.navAction = navAction;
  ctx.userData = userData;
  next();
}

navAction(userData());

async function onLogout() {
  await logout();
  navAction(userData());
  page("/home");
}
