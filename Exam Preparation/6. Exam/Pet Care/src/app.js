import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { navAction, userData } from "./util.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { catalogPage } from "./views/catalog.js";
import { homePage } from "./views/home.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { createPage } from "./views/create.js";
import { detailsContext } from "./middlewares.js";

const root = document.querySelector("#content");

page(decorateContext);
page("/", homePage);
page("/catalog", catalogPage);
page("/details/:id", detailsPage);
page("/edit/:id", detailsContext, editPage);
page("/create", createPage);
page("/login", loginPage);
page("/register", registerPage);

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
