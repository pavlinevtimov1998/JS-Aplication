import { render, page } from "./lib.js";
import { navAction, userData } from "./util.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("main");

page(decorateContext);
page("/home", homePage);
page("/create", createPage);
page("/details", detailsPage);
page("/login", loginPage);
page("/register", registerPage);

page("", "/home");

page.start();

async function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.navAction = navAction;
  ctx.userData = userData;
  next();
}

navAction(userData());
