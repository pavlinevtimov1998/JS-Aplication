import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { navAction, userData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("#main-content");

page(decorateContext);
page("/login", loginPage);
page("/register", registerPage);
page("/catalog", catalogPage);
page("/create", createPage);
page("/details/:id", detailsPage);
page("edit/:id", editPage);
page("/home", homePage);

page("/", "/home");
page.start();

async function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.navAction = navAction;
  ctx.userData = userData;
  next();
}

navAction(userData());

document.querySelector(".logout").addEventListener("click", async () => {
  await logout();
  navAction(userData());
  page.redirect("/home");
});
